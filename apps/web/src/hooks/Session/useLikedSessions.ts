import { useEffect, useState } from 'react';
import { fetcher } from '@repo/api';
import { UserProfile } from '@web/components/SessionPage/SessionList';

export const useLikedSessions = () => {
  const [userList, setUserList] = useState<UserProfile[]>([]);

  const fetchLikedList = async () => {
    try {
      const res = await fetcher.get<{ targetUserProfileList: UserProfile[] }>(
        '/search/users/liked'
      );
      setUserList(res.targetUserProfileList);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLikedList();
  }, []);

  const removeUserFromList = (userId: number) => {
    setUserList((prev) => prev.filter((user) => user.userId !== userId));
  };

  return {
    userList,
    removeUserFromList,
  };
};
