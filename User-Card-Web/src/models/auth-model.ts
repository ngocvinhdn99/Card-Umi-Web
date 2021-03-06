import { Effect, Reducer, history } from 'umi';
import { routerRedux } from 'dva/router';
import {
  STORAGE_KEYS,
  useTokenInfo,
  expirationTimeByMinutes,
} from '@/constants/index';
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
    handleTimeExpired: Effect;
    logout: Effect;
  };
  reducers: {
    updateState: Reducer<AuthModelState>;
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
  },
  effects: {
    *login(action, { call, put, select }) {
      const response = yield call(authApi.login, action.payload);
      const { data, message } = response;

      if (data) {
        const expirationTime = new Date().getTime() + expirationTimeByMinutes;
        const tokenInfo = useTokenInfo(data.token, expirationTime);

        localStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify(tokenInfo));
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
    *logout(action, { call, put, select }) {
      const currentState = yield select((_: any) => _.auth);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);

      yield put({
        type: 'updateState',
        payload: {
          ...currentState,
          userToken: '',
        },
      });

      notification.success({
        placement: 'topRight',
        message: 'Log out successfully',
      });

      history.push('/login');
    },
    *handleTimeExpired(action, { call, put, select }) {
      const currentState = yield select((_: any) => _.auth);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);

      yield put({
        type: 'updateState',
        payload: {
          ...currentState,
          userToken: '',
        },
      });

      notification.error({
        placement: 'topRight',
        message: 'Th???i h???n ????ng nh???p ???? h???t h???n, vui l??ng ????ng nh???p l???i',
      });
    },
  },
};

export default AuthModel;
