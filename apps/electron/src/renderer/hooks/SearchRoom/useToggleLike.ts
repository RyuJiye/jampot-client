import { fetcher } from '@repo/api';

export const useToggleLike = () => {
  const toggleLike = async (
    roomId: number,
    isLiked: boolean,
    onSuccess?: () => void
  ) => {
    try {
      if (isLiked) {
        await fetcher.delete(`/play-room/${roomId}/likes`);
      } else {
        await fetcher.put(`/play-room/${roomId}/likes`);
      }
      onSuccess?.();
    } catch (e) {
      console.error(e);
    }
  };

  return { toggleLike };
};
