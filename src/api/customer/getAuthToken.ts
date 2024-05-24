export const setTokens = (accessToken: string, refreshToken: string): void => {
  document.cookie = `accessToken=${accessToken}; path=/;`;
  document.cookie = `refreshToken=${refreshToken}; path=/;`;
};

export const removeTokens = (): void => {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
