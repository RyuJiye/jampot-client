export type PlayRoomDetail = {
  name: string;
  description: string;
  isPlayerLocked: boolean;
  isAudienceLocked: boolean;
  genreList: string[];
  sessionInfoList: {
    sessionName: string;
    max: number;
    count: number;
  }[];
  imageUrl: string;
  scheduleList: {
    id: number;
    date: string;
  }[];
};
