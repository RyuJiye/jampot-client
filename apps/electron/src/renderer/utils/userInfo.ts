export const getOrCreateUserId = () => {
  const persisted = localStorage.getItem('userId');
  if (persisted) return persisted;

  const id = crypto.randomUUID();
  localStorage.setItem('userId', id);
  return id;
};
