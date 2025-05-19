import {
  CreateRoomRequest,
  DEFAULT_SESSION_TYPES,
} from '@web/models/createRoom';
import { useState } from 'react';

export const useCreateRoomForm = () => {
  const [form, setForm] = useState<CreateRoomRequest>({
    name: '',
    description: '',
    imageUrl: '',
    playerPW: '',
    audiencePW: '',
    isPlayerLocking: false,
    isAudienceLocking: false,
    sessionMaxPairs: DEFAULT_SESSION_TYPES.map((session) => ({
      session,
      maxParticipants: 1,
    })),
    genreList: [],
  });

  const updateField = <K extends keyof CreateRoomRequest>(
    key: K,
    value: CreateRoomRequest[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSessionCount = (session: string, count: number) => {
    setForm((prev) => ({
      ...prev,
      sessionMaxPairs: prev.sessionMaxPairs.map((pair) =>
        pair.session === session ? { ...pair, maxParticipants: count } : pair
      ),
    }));
  };

  const toggleGenre = (genre: string) => {
    setForm((prev) => ({
      ...prev,
      genreList: prev.genreList.includes(genre)
        ? prev.genreList.filter((g) => g !== genre)
        : [...prev.genreList, genre],
    }));
  };

  return {
    form,
    updateField,
    updateSessionCount,
    toggleGenre,
  };
};
