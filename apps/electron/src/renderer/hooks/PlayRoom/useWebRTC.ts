import { useEffect, useRef, useState } from 'react';
import { exitPlayer } from '@electron/renderer/services/exitPlayer';
import { startWebRTC } from '@electron/renderer/services/webrtc';

interface UserInfo {
  id: string;
  name: string;
  role: string;
  profileImageUrl?: string;
}

interface Peer {
  id: string;
  name: string;
  role: string;
  profileImageUrl?: string;
}

interface UseWebRTCParams {
  roomId: string;
  userInfo: UserInfo;
  onLeaveSuccess: () => void;
}

export const useWebRTC = ({
  roomId,
  userInfo,
  onLeaveSuccess,
}: UseWebRTCParams) => {
  const [isConnected, setIsConnected] = useState(false);
  const [peerList, setPeerList] = useState<Peer[]>([]);

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef(new AudioContext());
  const gainNodesRef = useRef<Record<string, GainNode>>({});
  const myInfoRef = useRef<UserInfo>(userInfo);
  const [participants, setParticipants] = useState<Record<string, MediaStream>>(
    {}
  );

  useEffect(() => {
    const setup = async () => {
      if (audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioContext();
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const source = audioContextRef.current.createMediaStreamSource(myStream);
      const gainNode = audioContextRef.current.createGain();
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      gainNodesRef.current[userInfo.id] = gainNode;
      setParticipants((prev) => ({ ...prev, [userInfo.id]: myStream }));

      startWebRTC({
        userInfo,
        roomId,
        onConnect: () => setIsConnected(true),
        onLog: (msg) => console.log(msg),
        onTrack: (userId, stream) => {
          const source =
            audioContextRef.current.createMediaStreamSource(stream);
          const gainNode = audioContextRef.current.createGain();
          source.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);

          gainNodesRef.current[userId] = gainNode;
          setParticipants((prev) => ({ ...prev, [userId]: stream }));
        },
        onPeerList: (peers) => {
          const updated = peers.map((p) => ({
            ...p,
            profileImageUrl: p.profileImageUrl ?? userInfo.profileImageUrl,
          }));
          const unique = Array.from(
            new Map(updated.map((p) => [`${p.name}-${p.role}`, p])).values()
          );
          setPeerList(unique);
        },
        onSocketInit: (ws) => {
          socketRef.current = ws;
        },
      });
    };

    setup();
  }, [roomId, userInfo]);

  const handleInputSelect = async (deviceId: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: deviceId } },
    });

    if (gainNodesRef.current[userInfo.id]) {
      gainNodesRef.current[userInfo.id].disconnect();
    }

    const source = audioContextRef.current.createMediaStreamSource(stream);
    const gainNode = audioContextRef.current.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    gainNodesRef.current[userInfo.id] = gainNode;
    setParticipants((prev) => ({ ...prev, [userInfo.id]: stream }));
  };

  const handleOutputSelect = async (deviceId: string) => {
    const audios = Array.from(
      document.querySelectorAll('audio')
    ) as HTMLMediaElement[];

    for (const audio of audios) {
      if ('setSinkId' in audio) {
        try {
          await (audio as any).setSinkId(deviceId);
          console.log('출력 장치 설정됨:', deviceId);
        } catch (err) {
          console.warn('출력 장치 설정 실패:', err);
        }
      }
    }
  };

  const handleLeave = async () => {
    const socket = socketRef.current;

    if (socket) {
      socket.send(JSON.stringify({ type: 'disconnect', userId: userInfo.id }));
    }

    try {
      await exitPlayer(roomId);
    } catch (e) {
      console.error('서버 퇴장 실패:', e);
    }

    Object.values(gainNodesRef.current).forEach((node) => node.disconnect());
    audioContextRef.current.close();

    setIsConnected(false);
    setPeerList([]);
    setParticipants({});

    onLeaveSuccess();
  };

  return {
    isConnected,
    peerList,
    participants,
    gainNodesRef,
    handleInputSelect,
    handleOutputSelect,
    handleLeave,
  };
};
