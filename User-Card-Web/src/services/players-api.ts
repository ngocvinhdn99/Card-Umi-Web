import request from 'umi-request';
import { STORAGE_KEYS } from '@/constants/index';

const mainURL = 'http://localhost:1323/api/players';

const handleUpdatePlayersByIdApi = async (payload: any) => {
  const { data, token } = payload;
  try {
    const result = await request(`${mainURL}`, {
      method: 'put',
      data,
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
  update: handleUpdatePlayersByIdApi,
};
