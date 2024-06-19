export const getCookie = (name: string): string | void | null => {
  const cookie = document.cookie.split(';').find((el) => el.includes(name));

  return cookie?.split('=')[1] ? cookie?.split('=')[1] : null;
};

export const setCookie = (name: string, coockie: string): void => {
  document.cookie = `${name}=${coockie}; path=/;`;
};
