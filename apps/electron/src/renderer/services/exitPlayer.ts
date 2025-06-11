import { fetcher } from '@repo/api';

export const exitPlayer = async (playRoomId: string) => {
  return fetcher.put(`/play-room/${playRoomId}/exist/player`);
};
