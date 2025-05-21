import { Device, types } from 'mediasoup-client';

interface WebRTCOptions {
  onConnect: () => void;
  onLog: (message: string) => void;
  onTrack: (userId: string, stream: MediaStream) => void;
  onPeerList: (
    peers: {
      id: string;
      name: string;
      role: string;
      profileImageUrl?: string;
    }[]
  ) => void;
  userInfo: {
    id: string;
    name: string;
    role: string;
    profileImageUrl?: string;
  };
  roomId: string;
  onSocketInit?: (ws: WebSocket) => void;
}

export const startWebRTC = ({
  onConnect,
  onLog,
  onTrack,
  onPeerList,
  userInfo,
  roomId,
  onSocketInit,
}: WebRTCOptions) => {
  const socket = new WebSocket('ws://localhost:4000');
  let device: Device;
  let sendTransport: types.Transport;
  let recvTransport: types.Transport;

  if (onSocketInit) onSocketInit(socket);

  socket.onopen = () => {
    onLog('WebSocket 연결됨');
    onConnect();
    socket.send(JSON.stringify({ type: 'join', userInfo, roomId }));
    setTimeout(() => {
      socket.send(JSON.stringify({ type: 'getRouterRtpCapabilities' }));
    }, 100);
  };

  socket.onmessage = async (event) => {
    const message = JSON.parse(event.data);
    onLog(`메시지 수신: ${message.type}`);

    if (message.type === 'peerList') {
      const rawPeers: {
        id: string;
        name: string;
        role: string;
        profileImageUrl?: string;
      }[] = message.data;

      const filledPeers = rawPeers.map((p) => ({
        ...p,
        profileImageUrl: p.profileImageUrl ?? userInfo.profileImageUrl,
      }));

      const uniquePeers = Array.from(
        new Map(filledPeers.map((p) => [`${p.name}-${p.role}`, p])).values()
      );

      onPeerList(uniquePeers);
    } else if (message.type === 'routerRtpCapabilities') {
      device = new Device();
      await device.load({ routerRtpCapabilities: message.data });
      socket.send(JSON.stringify({ type: 'createTransport' }));
    } else if (message.type === 'transportCreated') {
      const transportParams: types.TransportOptions = message.data;
      sendTransport = device.createSendTransport(transportParams);

      sendTransport.on('connect', ({ dtlsParameters }, callback) => {
        socket.send(
          JSON.stringify({ type: 'connectTransport', dtlsParameters })
        );
        callback();
      });

      sendTransport.on('produce', ({ kind, rtpParameters }, callback) => {
        socket.send(JSON.stringify({ type: 'produce', kind, rtpParameters }));
        callback({ id: 'placeholder' });
      });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const track = stream.getAudioTracks()[0];
      await sendTransport.produce({ track });

      socket.send(JSON.stringify({ type: 'createRecvTransport' }));
    } else if (message.type === 'recvTransportCreated') {
      recvTransport = device.createRecvTransport(message.data);

      recvTransport.on('connect', ({ dtlsParameters }, callback) => {
        socket.send(
          JSON.stringify({ type: 'connectRecvTransport', dtlsParameters })
        );
        callback();
      });

      socket.send(
        JSON.stringify({
          type: 'consume',
          rtpCapabilities: device.rtpCapabilities,
        })
      );
    } else if (message.type === 'consumed') {
      const {
        id,
        producerId,
        kind,
        rtpParameters,
        userId: senderId,
      } = message.data;
      const consumer = await recvTransport.consume({
        id,
        producerId,
        kind,
        rtpParameters,
      });
      const stream = new MediaStream([consumer.track]);
      onTrack(senderId, stream);

      const audio = new Audio();
      audio.srcObject = stream;
      audio.play().catch(() => {
        console.warn('오디오 자동재생 실패');
      });
    } else if (message.type === 'newProducer') {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          socket.send(
            JSON.stringify({
              type: 'consume',
              rtpCapabilities: device.rtpCapabilities,
            })
          );
        }, 200 * i);
      }
    }
  };
};
