import { Header } from '@electron/renderer/components/common/Header';
import { RoomDetailView } from '@electron/renderer/components/RoomDetailPage/RoomDetailView';
import { PlayRoomDetail } from '@electron/renderer/models/playroomDetail';
import { enterPlayer } from '@electron/renderer/services/enterPlayer';
import { getPlayRoomDetail } from '@electron/renderer/services/getPlayRoomDetail';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const RoomDetailPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<PlayRoomDetail | null>(null);

  useEffect(() => {
    if (!roomId) return;
    getPlayRoomDetail(roomId).then((res) =>
      setData({
        ...res,
        sessionInfoList: res.sessionInfoList.map((s) => ({
          sessionName: s.sessionName,
          max: s.max,
          count: s.count,
        })),
      })
    );
  }, [roomId]);

  const handleEnterPlayer = async () => {
    if (!roomId) return;

    const playerPW = prompt('연주자 비밀번호');
    if (!playerPW) return;

    const session = prompt('세션 이름');
    if (!session) return;

    try {
      const res = await enterPlayer(roomId, { playerPW, session });
      if (!res.success) {
        alert(res.message);
        return;
      }

      const me = res.roomStatus.participantList.find(
        (p) => p.session === session
      );
      if (!me) {
        alert('참가자 정보 없음');
        return;
      }

      navigate(`/play-room/${roomId}`, {
        state: {
          name: me.nickName,
          role: me.session,
          profileImageUrl: me.imgUrl,
        },
      });
    } catch (e) {
      console.error(e);
      alert('입장 실패');
    }
  };

  const handleEnterAudience = () => alert('준비 중');

  if (!data) return <div>불러오는 중...</div>;

  return (
    <>
      <Header />
      <RoomDetailView
        data={data}
        onEnterPlayer={handleEnterPlayer}
        onEnterAudience={handleEnterAudience}
      />
    </>
  );
};
