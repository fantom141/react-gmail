export const localStorageService = {
  get: (key: string): any | null => {
    try {
      return JSON.parse(window.localStorage[key]);
    } catch (e) {
      return null;
    }
  },

  set: (key: string, value: any): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: string): void => {
    window.localStorage.removeItem(key);
  },
};
