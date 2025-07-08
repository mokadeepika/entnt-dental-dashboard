export const loadState  = (k, f = null) => JSON.parse(localStorage.getItem(k)) ?? f;
export const saveState  = (k, v)        => localStorage.setItem(k, JSON.stringify(v));
export const clearState = (k)           => localStorage.removeItem(k);
