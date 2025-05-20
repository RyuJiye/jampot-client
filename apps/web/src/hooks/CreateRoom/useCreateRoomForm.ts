import { useState } from 'react';

export type SessionMaxPair = {
  session: string;
  maxParticipants: number;
};

export type CreateRoomFormState = {
  name: string;
  description: string;
  imageUrl: string;
  playerPW: string;
  audiencePW: string;
  isPlayerLocking: boolean;
  isAudienceLocking: boolean;
  sessionMaxPairs: SessionMaxPair[];
  genreList: string[];
};

const initialForm: CreateRoomFormState = {
  name: '',
  description: '',
  imageUrl: '',
  playerPW: '',
  audiencePW: '',
  isPlayerLocking: false,
  isAudienceLocking: false,
  sessionMaxPairs: [],
  genreList: [],
};

export const useCreateRoomForm = () => {
  const [form, setForm] = useState<CreateRoomFormState>(initialForm);

  const updateField = <K extends keyof CreateRoomFormState>(
    key: K,
    value: CreateRoomFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    form,
    updateField,
    setForm,
  };
};
