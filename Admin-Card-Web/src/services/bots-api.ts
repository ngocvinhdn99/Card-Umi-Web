import request from 'umi-request';
import { STORAGE_KEYS } from '@/constants/index';

const mainURL = 'http://localhost:1323/admin/bots';

const handleGetListBotApi = async (payload: any) => {
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

const handleGetBotByIdApi = async (botId: any) => {
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

const handleCreateBotByIdApi = async (payload: any) => {
  // const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const { data, token } = payload;
  try {
    const result = await request(`${mainURL}`, {
      method: 'post',
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

const handleUpdateBotByIdApi = async (payload: any) => {
  // const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const { data, token } = payload;
  try {
    const result = await request(`${mainURL}/${data.id}`, {
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

const handleDeleteBotByIdApi = async (payload: any) => {
  // const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const { data, token } = payload;
  const { id: botId } = data;
  try {
    const result = await request(`${mainURL}/${botId}`, {
      method: 'delete',
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
  getAll: handleGetListBotApi,
  get: handleGetBotByIdApi,
  create: handleCreateBotByIdApi,
  update: handleUpdateBotByIdApi,
  delete: handleDeleteBotByIdApi,
};
