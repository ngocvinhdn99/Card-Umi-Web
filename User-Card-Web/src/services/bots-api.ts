import request from 'umi-request';
import { STORAGE_KEYS } from '@/constants/index';

const mainURL = 'http://localhost:1323/bots';

const handleGetListBotApi = async (payload: any) => {
  console.log('payload', payload);
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
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

const handleGetBotByIdApi = async (botId: any) => {
  console.log('botId', botId);
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  try {
    const result = await request(`${mainURL}/${botId}`, {
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
  getListBot: handleGetListBotApi,
  getBotById: handleGetBotByIdApi,
};
