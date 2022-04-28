import request from 'umi-request';
import { STORAGE_KEYS } from '@/constants/index';

const mainURL = 'http://localhost:1323/api/games';

const handleStartGamesByBotIdApi = async (payload: any) => {
  const { botId, betValue, token } = payload;

  try {
    const result = await request(`${mainURL}/${botId}`, {
      method: 'post',
      data: {
        betValue,
      },
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
    return result;
  } catch (error) {
    const { data, response } = error;
    return data;
  }
};

const handleStartRamdomGamesApi = async (payload: any) => {
  const { betValue, token } = payload;

  try {
    const result = await request(`${mainURL}`, {
      method: 'post',
      data: {
        betValue,
      },
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
    return result;
  } catch (error) {
    const { data, response } = error;
    return data;
  }
};

const handleGetRecentGamesByTokenApi = async (payload: any) => {
  const { token } = payload;

  try {
    const result = await request(`${mainURL}`, {
      method: 'get',
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
    return result;
  } catch (error) {
    const { data, response } = error;
    return data;
  }
};

export default {
  startById: handleStartGamesByBotIdApi,
  startRamdom: handleStartRamdomGamesApi,
  getRecentGames: handleGetRecentGamesByTokenApi,
};
