import { fetcher } from '@repo/api';
import { RoomProfile } from '@web/components/SearchRoomPage/SearchRoomList';
import { useEffect, useState } from 'react';

export const useLikedRooms = () => {
  const [roomList, setRoomList] = useState<RoomProfile[]>([]);
  const fetchLikedRoom = async () => {
    try {
      const res = await fetcher.get<{ targetRoomProfileList: RoomProfile[] }>(
        '/search/play-rooms/liked'
      );
      setRoomList(res.targetRoomProfileList);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchLikedRoom();
  }, []);

  const removeRoomFromList = (playRoomId: number) => {
    setRoomList((prev) =>
      prev.filter((room) => room.playRoomId !== playRoomId)
    );
  };

  return {
    roomList,
    removeRoomFromList,
  };
};
