import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayRoomDetail } from '@web/services/getPlayRoomDetail';
import { PlayRoomDetail } from '@web/models/playroomDetail';

import { Header } from '@web/components/common/Header';
import { RoomDetailView } from '@web/components/RoomDetailPage/RoomDetailView';

export const RoomDetailPage = () => {
  const { roomId } = useParams();
  const [data, setData] = useState<PlayRoomDetail | null>(null);

  useEffect(() => {
    if (!roomId) return;

    getPlayRoomDetail(roomId).then((res) => {
      const patched: PlayRoomDetail = {
        ...res,
        sessionInfoList: res.sessionInfoList.map((s) => ({
          sessionName: s.sessionName,
          max: s.max,
          count: s.count,
        })),
      };
      setData(patched);
    });
  }, [roomId]);

  if (!data) return <div>불러오는 중...</div>;

  return (
    <>
      <Header />
      <RoomDetailView data={data} />
    </>
  );
};
