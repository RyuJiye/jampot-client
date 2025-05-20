import { fetcher } from '@repo/api';
import { CreateRoomFormState } from '@web/hooks/CreateRoom/useCreateRoomForm';

type CreateRoomResponse = {
  playRoomId: number;
};

export const createRoom = async (
  data: CreateRoomFormState
): Promise<CreateRoomResponse> => {
  return fetcher.post('/play-room/create', data);
};
