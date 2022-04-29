import request from 'umi-request';
import { STORAGE_KEYS, API_MAIN_URL } from '@/constants/index';

const mainURL = `${API_MAIN_URL}/admin/games`;
// const mainURL = 'http://localhost:1323/admin/games';

const handleGetAllGamesByTokenApi = async (payload: any) => {
  const { token, params } = payload;

  try {
    const result = await request(`${mainURL}`, {
      method: 'get',
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      params,
    });
    return result;
  } catch (error) {
    const { data, response } = error;
    return data;
  }
};

export default {
  getAll: handleGetAllGamesByTokenApi,
};
