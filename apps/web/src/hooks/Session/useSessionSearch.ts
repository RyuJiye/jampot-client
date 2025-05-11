import { useCallback, useState, useEffect } from 'react';
import {
  SessionList,
  UserProfile,
} from '@web/components/SessionPage/SessionList';
import { SESSION_LABEL_TO_VALUE } from '@web/constants/onboarding';

export const useSessionSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [userList, setUserList] = useState<UserProfile[]>([]);

  const handleSearch = useCallback(async () => {
    const sessionQuery = selectedSessions
      .filter(
        (label): label is keyof typeof SESSION_LABEL_TO_VALUE =>
          label in SESSION_LABEL_TO_VALUE
      )
      .map((label) => SESSION_LABEL_TO_VALUE[label]);

    const result = await SessionList({
      nickname: inputValue,
      sessionList: sessionQuery,
      genreList: selectedGenres,
    });

    setUserList(result);
  }, [inputValue, selectedSessions, selectedGenres]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return {
    inputValue,
    setInputValue,
    selectedSessions,
    setSelectedSessions,
    selectedGenres,
    setSelectedGenres,
    userList,
    handleSearch,
  };
};
