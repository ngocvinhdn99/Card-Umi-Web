import request from 'umi-request';
import { STORAGE_KEYS } from '@/constants/index';

const mainURL = 'http://localhost:1323/api/profile';

const handleGetProfileByTokenApi = async (payload: any) => {
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
  get: handleGetProfileByTokenApi,
};
