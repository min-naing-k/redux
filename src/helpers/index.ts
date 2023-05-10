export const pause = (duration: number): Promise<string> | null  => {
  if (import.meta.env.VITE_APP_ENV === 'local') {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  return null;
};