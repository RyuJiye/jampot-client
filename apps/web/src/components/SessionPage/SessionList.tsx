import { fetcher } from '@repo/api';
import qs from 'qs';

export type UserProfile = {
  userId: number;
  profileImgUrl: string;
  nickName: string;
  selfIntroduction: string;
  sessionList: string[];
  isLiked: boolean;
};

type SessionListResponse = {
  targetUserProfileList: UserProfile[];
};

export const SessionList = async ({
  nickname,
  sessionList,
  genreList,
}: {
  nickname: string;
  sessionList: string[];
  genreList: string[];
}): Promise<UserProfile[]> => {
  const isEmpty =
    nickname === '' && sessionList.length === 0 && genreList.length === 0;

  const res = await fetcher.get<SessionListResponse>(
    '/search/users/condition',
    {
      ...(isEmpty
        ? {}
        : {
            params: {
              nickname,
              sessionList,
              genreList,
            },
            paramsSerializer: (params) =>
              qs.stringify(params, { arrayFormat: 'comma' }),
          }),
    }
  );

  return res.targetUserProfileList;
};
