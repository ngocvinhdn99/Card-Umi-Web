import request from 'umi-request';

const mainURL = 'http://localhost:1323/auth';

const handleLoginApi = async (payload: any) => {
  console.log('payload', payload);
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

const handleAdminLoginApi = async (payload: any) => {
  console.log('payload', payload);
  const fakeAdminPayload = {
    username: 'admin',
    password: '123456',
  };
  try {
    const result = await request(`${mainURL}/admin-login`, {
      method: 'post',
      data: fakeAdminPayload,
    });
    return result;
  } catch (error) {
    const { data, response } = error;
    return data;
  }
};

const handleRegisterApi = async (payload: any) => {
  console.log('payload', payload);
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
  admin: handleAdminLoginApi,
};
