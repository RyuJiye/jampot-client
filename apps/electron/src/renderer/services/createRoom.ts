import { CreateRoomFormState } from '@electron/renderer/hooks/CreateRoom/useCreateRoomForm';
import { fetcher } from '@repo/api';

type CreateRoomResponse = {
  playRoomId: number;
};

export const createRoom = async (
  data: CreateRoomFormState
): Promise<CreateRoomResponse> => {
  return fetcher.post('/play-room/create', data);
};
