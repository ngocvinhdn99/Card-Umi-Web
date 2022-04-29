import request from 'umi-request';
import { STORAGE_KEYS, API_MAIN_URL } from '@/constants/index';

const mainURL = `${API_MAIN_URL}/admin/bots`;

// const mainURL = 'http://localhost:1323/admin/bots';

const handleGetListBotApi = async (payload: any) => {
  const { token, pagination } = payload;
  const { page, limit } = pagination;
  try {
    const result = await request(`${mainURL}`, {
      method: 'get',
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      params: {
        page,
        limit,
      },
    });
    return result;
  } catch (error) {
    const { data, response } = error;
    return data;
  }
};

const handleGetBotByIdApi = async (payload: any) => {
  const { botId, token } = payload;
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
