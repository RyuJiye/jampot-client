import { fetcher } from '@repo/api';
import qs from 'qs';

export type RoomProfile = {
  playRoomId: number;
  name: string;
  imgUrl: string;
  genre: string[];
  remainSessions: string[];
  isLiked: boolean;
};

type SearchRoomListProps = {
  roomList: RoomProfile[];
};

export const SessionList = async ({
  isPlayerLocked,
  sessionList,
  genreList,
}: {
  isPlayerLocked: boolean;
  sessionList: string[];
  genreList: string[];
}): Promise<RoomProfile[]> => {
  const res = await fetcher.get<RoomProfile[]>('/search/play-rooms/condition', {
    params: {
      isPlayerLocked,
      sessionList,
      genreList,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'comma' }),
  });

  return res;
};
