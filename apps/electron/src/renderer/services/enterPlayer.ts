import { fetcher } from '@repo/api';

type EnterPlayerRequest = {
  playerPW: string;
  session: string;
};

type EnterPlayerResponse = {
  success: boolean;
  message: string;
  roomStatus: {
    participantList: {
      nickName: string;
      session: string;
      imgUrl: string;
    }[];
  };
};

export const enterPlayer = async (
  playRoomId: string,
  body: EnterPlayerRequest
) => {
  const res = await fetcher.post<EnterPlayerResponse>(
    `/play-room/${playRoomId}/enter/player`,
    body
  );
  return res;
};
