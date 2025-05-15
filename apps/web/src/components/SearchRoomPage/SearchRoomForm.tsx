import styled from '@emotion/styled';
import { ButtonTextField, Dropdown, RoomCard } from '@repo/ui';
import { GENRES, SESSION_LABELS } from '@web/constants/onboarding';
import { useState } from 'react';
import { useRoomSearch } from '@web/hooks/SearchRoom/useRoomSearch';
import { useToggleLike } from '@web/hooks/Session/useToggleLike';

const LOCK_OPTIONS = [
  { label: '잠금', value: 'locked' },
  { label: '열림', value: 'unlocked' },
];

export const SearchRoomForm = () => {
  const [isLockedList, setIsLockedList] = useState<string[]>([]);

  const toBoolean = (v: string[]): boolean | undefined => {
    if (v.includes('잠금')) return false;
    if (v.includes('열림')) return true;
    return undefined;
  };

  const {
    inputValue,
    setInputValue,
    selectedSessions,
    setSelectedSessions,
    selectedGenres,
    setSelectedGenres,
    roomList,
    handleSearch,
  } = useRoomSearch({ isPlayerLocked: toBoolean(isLockedList) });

  const { toggleLike } = useToggleLike();
  console.log('roomList', roomList);

  return (
    <>
      <FormHeader>
        <SearchContainer>
          <ButtonTextField
            placeholder="입력하세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            buttonText="전송"
            buttonClickHandler={handleSearch}
          />
        </SearchContainer>
        <Dropdowns>
          <Dropdown
            title="잠금 / 열림"
            contents={LOCK_OPTIONS.map((opt) => opt.label)}
            selectedContents={isLockedList}
            setSelectedContents={setIsLockedList}
          />

          <Dropdown
            title="세션 선택"
            contents={SESSION_LABELS}
            selectedContents={selectedSessions}
            setSelectedContents={setSelectedSessions}
          />
          <Dropdown
            title="장르 선택"
            contents={GENRES}
            selectedContents={selectedGenres}
            setSelectedContents={setSelectedGenres}
          />
        </Dropdowns>
      </FormHeader>

      <FormContent>
        {roomList.map((user) => (
          <RoomCard
            key={user.playRoomId}
            imgUrl={user.imgUrl}
            name={user.name}
            genre={user.genre}
            remainSessions={user.remainSessions}
            isLiked={user.isLiked}
            onLike={() =>
              toggleLike(user.playRoomId, user.isLiked, () => {
                handleSearch();
              })
            }
          />
        ))}
      </FormContent>
    </>
  );
};

const FormHeader = styled.div`
  display: flex;
  height: 54px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Dropdowns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const FormContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;
