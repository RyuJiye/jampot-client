import { fetcher } from '@repo/api';
import { RoomProfile } from '@web/components/SearchRoomPage/SearchRoomList';
import { useEffect, useState } from 'react';

export const useLikedRooms = () => {
  const [roomList, setRoomList] = useState<RoomProfile[]>([]);

  useEffect(() => {
    const fetchLikedRooms = async () => {
      try {
        const res = await fetcher.get<{ playRoomProfileList: RoomProfile[] }>(
          '/search/play-rooms/liked'
        );

        setRoomList(res.playRoomProfileList);
      } catch (error) {}
    };

    fetchLikedRooms();
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
