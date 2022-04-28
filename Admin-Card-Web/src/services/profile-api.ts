import request from 'umi-request';
import { STORAGE_KEYS } from '@/constants/index';

const mainURL = 'http://localhost:1323/admin/profiles';

const handleGetListProfileApi = async (payload: any) => {
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

const handleGetProfileByIdApi = async (profileId: any) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  try {
    const result = await request(`${mainURL}/${profileId}`, {
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

const handleUpdateProfileByIdApi = async (payload: any) => {
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

const handleDeleteProfileByIdApi = async (payload: any) => {
  const { data, token } = payload;
  const { id: profileId } = data;
  try {
    const result = await request(`${mainURL}/${profileId}`, {
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
  getAll: handleGetListProfileApi,
  get: handleGetProfileByIdApi,
  update: handleUpdateProfileByIdApi,
  delete: handleDeleteProfileByIdApi,
};
