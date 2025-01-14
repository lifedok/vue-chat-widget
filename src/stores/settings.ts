import { defineStore } from 'pinia';

const saveToLocalStorage = (key: string, value: never) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key: string, defaultValue: never) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    expirationOptions: [
      { text: '1 min', value: '1' },
      { text: '3 min', value: '3' },
      { text: '5 min', value: '5' },
      { text: '10 min', value: '10' },
      { text: '30 min', value: '30' },
      { text: '4 hour', value: '240' },
      { text: '1 day', value: '1440' },
      { text: '1 week', value: '10080' },
    ],
    selectedExpiration: loadFromLocalStorage('selectedExpiration', '3'), // Default: 3 min
  }),
  actions: {
    updateSelectedExpiration(value: string) {
      this.selectedExpiration = value;
      saveToLocalStorage('selectedExpiration', value);
    },
  },
});
