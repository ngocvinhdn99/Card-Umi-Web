import { Effect, Reducer, history } from 'umi';
import { routerRedux } from 'dva/router';
import { STORAGE_KEYS } from '@/constants/index';
import { notification } from 'antd';
import authApi from '@/services/auth-api';

export interface AuthModelState {
  userToken?: string;
}

export interface AuthModelType {
  namespace: 'auth';
  state: AuthModelState;
  effects: {
    login: Effect;
    register: Effect;
    adminLogin: Effect;
  };
  reducers: {
    updateState: Reducer<AuthModelState>;
    logout: Reducer<AuthModelState>;
  };
}

const AuthModel: AuthModelType = {
  namespace: 'auth',
  state: {
    userToken: localStorage.getItem(STORAGE_KEYS.TOKEN) || '',
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout(state) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      return {
        ...state,
        userToken: '',
      };
    },
  },
  effects: {
    *login(action, { call, put, select }) {
      const response = yield call(authApi.login, action.payload);
      const { data, message } = response;

      if (data) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        const currentState = yield select((_: any) => _.auth);

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            userToken: data.token,
          },
        });

        notification.success({
          placement: 'topRight',
          message: 'Login successfully',
        });

        // yield put(routerRedux.push('/home'));
        history.push('/home');
      } else {
        console.log('error: ', message);
        notification.error({
          placement: 'topRight',
          message: 'Login is failed',
          description: message,
        });
      }
    },
    *register(action, { call, put }) {
      const response = yield call(authApi.register, action.payload);
      const { data, message } = response;
      const isRegisterSuccess = message === 'success';
      if (isRegisterSuccess) {
        notification.success({
          placement: 'topRight',
          message: 'Register successfully',
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Register is failed',
          description: message,
        });
      }
    },
    *adminLogin(action, { call, put }) {
      const response = yield call(authApi.admin, action.payload);
      const { data, message } = response;
      console.log('response', response);
      console.log('data', data);
    },
  },
};

export default AuthModel;
