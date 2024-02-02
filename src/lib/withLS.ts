import { writable } from '@spred/core';

export function withLS<T>(localStorageKey: string, defaultValue: T) {
  let value: any = defaultValue;

  try {
    const lsValue = localStorage.getItem(localStorageKey);
    if (lsValue) value = JSON.parse(lsValue);
  } finally {
    const signal = writable<T>(value);

    signal.subscribe((value) => {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      } catch (e) {
        console.log(e);
      }
    });

    return signal;
  }
}
