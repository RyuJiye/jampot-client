import { PlayRoomDetail } from '@electron/renderer/models/playroomDetail';
import { fetcher } from '@repo/api';

export const getPlayRoomDetail = async (playRoomId: string) => {
  const res = await fetcher.get<PlayRoomDetail>(
    `/play-room/${playRoomId}/detailInfo`
  );

  return res;
};
