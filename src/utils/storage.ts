export const save = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const load = (key: string) => localStorage.getItem(key);
