const storage = {
  add(key, value) {
    return window.localStorage.setItem(key, value);
  },
  remove(key) {
    return window.localStorage.removeItem(key);
  },
  get(key) {
    return window.localStorage.getItem(key);
  },
};

export default storage;
