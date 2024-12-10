const getSessionStorage = () => {
	return typeof window !== 'undefined' ? sessionStorage : null;
};
const getLocalStorage = () => {
	return typeof window !== 'undefined' ? localStorage : null;
};

export const getSessionData = (key: string) => {
	return getSessionStorage()?.getItem(key);
};
export const setSessionData = (key: string, value: string) => {
	getSessionStorage()?.setItem(key, value);
};
export const removeSession = (key: string) => {
	getSessionStorage()?.removeItem(key);
};
export const getStorageData = (key: string) => {
	return getLocalStorage()?.getItem(key);
};
export const setStorageData = (key: string, value: string) => {
	getLocalStorage()?.setItem(key, value);
};
export const delStorageData = (key: string) => {
	getLocalStorage()?.removeItem(key);
};

//const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
