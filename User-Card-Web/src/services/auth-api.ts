import request from 'umi-request';
import { API_MAIN_URL } from '@/constants/index';

const mainURL = `${API_MAIN_URL}/api`;
// const mainURL = 'http://localhost:1323/api';

const handleLoginApi = async (payload: any) => {
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

const handleRegisterApi = async (payload: any) => {
  try {
    const result = await request(`${mainURL}/register`, {
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
  login: handleLoginApi,
  register: handleRegisterApi,
};
