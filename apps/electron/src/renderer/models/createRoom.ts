export type CreateRoomRequest = {
  name: string;
  description: string;
  imageUrl: string;
  playerPW: string;
  audiencePW: string;
  isPlayerLocking: boolean;
  isAudienceLocking: boolean;
  sessionMaxPairs: {
    session: string;
    maxParticipants: number;
  }[];
  genreList: string[];
};

export const DEFAULT_SESSION_TYPES = [
  '보컬',
  '기타',
  '드럼',
  '키보드',
  '베이스',
] as const;
