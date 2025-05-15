import { useState, useEffect } from 'react';
import {
  RoomProfile,
  SearchRoomList,
} from '@web/components/SearchRoomPage/SearchRoomList';
import { SESSION_LABEL_TO_VALUE } from '@web/constants/onboarding';

type Props = {
  isPlayerLocked?: boolean;
};

export const useRoomSearch = ({ isPlayerLocked }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [roomList, setRoomList] = useState<RoomProfile[]>([]);

  const handleSearch = async () => {
    const sessionQuery = selectedSessions
      .filter(
        (label): label is keyof typeof SESSION_LABEL_TO_VALUE =>
          label in SESSION_LABEL_TO_VALUE
      )
      .map((label) => SESSION_LABEL_TO_VALUE[label]);

    const result = await SearchRoomList({
      isPlayerLocked,
      sessionList: sessionQuery,
      genreList: selectedGenres,
    });

    setRoomList(result);
  };

  useEffect(() => {
    handleSearch();
  }, [inputValue, selectedSessions, selectedGenres, isPlayerLocked]);

  return {
    inputValue,
    setInputValue,
    selectedSessions,
    setSelectedSessions,
    selectedGenres,
    setSelectedGenres,
    roomList,
    handleSearch,
  };
};
