import { IObject } from '../Types';

export const setStorage = (key: string, object: IObject | string) => {
  return localStorage.setItem(key, JSON.stringify(object));
};

export const getStorage = (key: string) => {
  const obj = localStorage.getItem(key);
  if (obj) {
    return JSON.parse(obj);
  }
  return [];
};

export const clearStorageKey = (key: string) => {
  localStorage.removeItem(key);
};
