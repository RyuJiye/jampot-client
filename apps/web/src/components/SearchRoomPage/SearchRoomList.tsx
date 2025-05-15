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

type RoomListResponse = {
  playRoomProfileList: RoomProfile[];
};

export const SearchRoomList = async ({
  isPlayerLocked,
  sessionList,
  genreList,
}: {
  isPlayerLocked?: boolean;
  sessionList: string[];
  genreList: string[];
}): Promise<RoomProfile[]> => {
  //const isEmpty = sessionList.length === 0 && genreList.length === 0;

  const res = await fetcher.get<RoomListResponse>(
    '/search/play-rooms/condition',
    {
      params: {
        isPlayerLocked,
        ...(sessionList.length > 0 && { sessionList }),
        ...(genreList.length > 0 && { genreList }),
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'comma' }),
    }
  );
  const params = {
    isPlayerLocked,
    ...(sessionList.length > 0 && { sessionList }),
    ...(genreList.length > 0 && { genreList }),
  };

  console.log('search params:', params);

  console.log('API raw response:', res);

  return res.playRoomProfileList ?? [];
};
