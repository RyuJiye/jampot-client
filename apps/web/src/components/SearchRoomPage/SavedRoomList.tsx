import { RoomCard } from '@repo/ui';
import { useLikedRooms } from '@web/hooks/SearchRoom/useLikedRooms';

export const SavedRoomList = () => {
  const { userList, removeUserFromList } = useLikedRooms();
  const { toggleLike } = useToggleLike();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {userList.map((user) => (
        <RoomCard
          key={user.playRoomId}
          imgUrl={user.imgUrl}
          name={user.name}
          genre={user.genre}
          remainSessions={user.remainSessions}
          isLiked={user.isLiked}
          onLike={() =>
            toggleLike(user.userId, user.isLiked, () => {
              removeUserFromList(user.userId);
            })
          }
        />
      ))}
    </div>
  );
};
