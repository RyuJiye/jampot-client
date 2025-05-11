import { SessionCard } from '@repo/ui';
import { useLikedSessions } from '@web/hooks/Session/useLikedSessions';
import { useToggleLike } from '@web/hooks/Session/useToggleLike';

export const SavedSessionList = () => {
  const { userList, removeUserFromList } = useLikedSessions();
  const { toggleLike } = useToggleLike();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {userList.map((user) => (
        <SessionCard
          key={user.userId}
          profileImgUrl={user.profileImgUrl}
          nickName={user.nickName}
          selfIntroduction={user.selfIntroduction}
          sessionList={user.sessionList}
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
