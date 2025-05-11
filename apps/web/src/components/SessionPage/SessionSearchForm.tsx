import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ButtonTextField, Dropdown, SessionCard } from '@repo/ui';
import {
  GENRES,
  SESSION_LABEL_TO_VALUE,
  SESSION_LABELS,
} from '@web/constants/onboarding';
import {
  SessionList,
  UserProfile,
} from '@web/components/SessionPage/SessionList';

export const SessionSearchForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [userList, setUserList] = useState<UserProfile[]>([]);

  const handleSearch = async () => {
    const sessionQuery = selectedSessions
      .map(
        (label) =>
          SESSION_LABEL_TO_VALUE[label as keyof typeof SESSION_LABEL_TO_VALUE]
      )
      .filter(
        (
          val
        ): val is (typeof SESSION_LABEL_TO_VALUE)[keyof typeof SESSION_LABEL_TO_VALUE] =>
          typeof val === 'string'
      );

    const result = await SessionList({
      nickname: inputValue,
      sessionList: sessionQuery,
      genreList: selectedGenres,
    });

    setUserList(result);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [inputValue, selectedSessions, selectedGenres]);

  const toggleLike = (userId: number) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.userId === userId ? { ...user, isLiked: !user.isLiked } : user
      )
    );
  };

  return (
    <>
      <FormHeader>
        <ButtonTextField
          placeholder="입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          buttonText="전송"
          buttonClickHandler={handleSearch}
        />
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
            onLike={() => toggleLike(user.userId)}
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
