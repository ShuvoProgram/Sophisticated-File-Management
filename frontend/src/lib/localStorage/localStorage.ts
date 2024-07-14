export const setToLocalStorage = (key: string, token: string): void => {
  if (!key || typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string): string | null => {
  if (!key || typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
};