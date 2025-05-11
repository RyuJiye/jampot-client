import { fetcher } from '@repo/api';

export const useToggleLike = () => {
  const toggleLike = async (
    userId: number,
    isLiked: boolean,
    onSuccess?: () => void
  ) => {
    try {
      if (isLiked) {
        await fetcher.delete(`/users/${userId}/likes`);
      } else {
        await fetcher.put(`/users/${userId}/likes`);
      }
      onSuccess?.();
    } catch (e) {
      console.error(e);
    }
  };

  return { toggleLike };
};
