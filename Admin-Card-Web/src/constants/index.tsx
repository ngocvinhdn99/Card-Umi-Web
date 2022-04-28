export const STORAGE_KEYS = {
  TOKEN: 'admin_token',
};

export const homeImg =
  'https://www.freevector.com/uploads/vector/preview/15279/FreeVector-Poker-Cards-Game.jpg';

export const useTokenInfo = (token: string, expirationTime: number) => {
  return {
    token,
    expirationTime,
  };
};

export const useTokenCheck = (tokenInfo: any) => {
  // Case not token -> not login
  if (!tokenInfo) return null;

  // Case exist token -> check
  const { token, expirationTime } = tokenInfo;
  const currentTime = new Date().getTime();

  if (expirationTime > currentTime) {
    return token;
  } else {
    return null;
  }
};

export const expirationTimeByMinutes = 60 * 60 * 1000;

export const API_MAIN_URL = 'http://localhost:1323';
