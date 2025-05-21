import styled from '@emotion/styled';
import { ButtonTextField, Dropdown, SessionCard } from '@repo/ui';
import { SESSION_LABELS, GENRES } from '@web/constants/onboarding';
import { useSessionSearch } from '@web/hooks/Session/useSessionSearch';
import { useToggleLike } from '@web/hooks/Session/useToggleLike';

export const SessionSearchForm = () => {
  const {
    inputValue,
    setInputValue,
    selectedSessions,
    setSelectedSessions,
    selectedGenres,
    setSelectedGenres,
    userList,
    handleSearch,
  } = useSessionSearch();

  const { toggleLike } = useToggleLike();

  return (
    <>
      <FormHeader>
        <SearchContainer>
          <ButtonTextField
            placeholder="세션 이름을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            buttonText="입력"
            buttonClickHandler={handleSearch}
          />
        </SearchContainer>
        <Dropdowns>
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
