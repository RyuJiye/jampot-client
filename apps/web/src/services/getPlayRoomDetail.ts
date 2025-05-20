import { fetcher } from '@repo/api';
import { PlayRoomDetail } from '@web/models/playroomDetail';

export const getPlayRoomDetail = async (playRoomId: string) => {
  const res = await fetcher.get<PlayRoomDetail>(
    `/play-room/${playRoomId}/detailInfo`
  );

  return res;
};
