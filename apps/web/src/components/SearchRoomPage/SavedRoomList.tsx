import { RoomCard } from '@repo/ui';
import { useLikedRooms } from '@web/hooks/SearchRoom/useLikedRooms';
import { useToggleLike } from '@web/hooks/SearchRoom/useToggleLike';

export const SavedRoomList = () => {
  const { roomList, removeRoomFromList } = useLikedRooms();
  const { toggleLike } = useToggleLike();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {roomList.map((room) => (
        <RoomCard
          key={room.playRoomId}
          imgUrl={room.imgUrl}
          name={room.name}
          genre={room.genre}
          remainSessions={room.remainSessions}
          isLiked={room.isLiked}
          onLike={() =>
            toggleLike(room.playRoomId, room.isLiked, () => {
              removeRoomFromList(room.playRoomId);
            })
          }
        />
      ))}
    </div>
  );
};
