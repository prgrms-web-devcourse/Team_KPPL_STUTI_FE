const storage = window.localStorage;

export const setStorageItem = (key: string, value: string) => {
  try {
    storage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getStorageItem = (key: string, defaultValue: string) => {
  try {
    const storedValue = storage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }

    return storedValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

export const removeStorageItem = (key: string) => {
  storage.removeItem(key);
};
