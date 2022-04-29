import request from 'umi-request';
import { API_MAIN_URL } from '@/constants/index';

const mainURL = `${API_MAIN_URL}/admin`;
// const mainURL = 'http://localhost:1323/admin';

const handleAdminLoginApi = async (payload: any) => {
  try {
    const result = await request(`${mainURL}/login`, {
      method: 'post',
      data: payload,
    });
    return result;
  } catch (error) {
    const { data, response } = error;
    return data;
  }
};

export default {
  admin: handleAdminLoginApi,
};
