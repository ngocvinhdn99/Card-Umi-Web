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
  adminToken?: string;
}

export interface AuthModelType {
  namespace: 'auth';
  state: AuthModelState;
  effects: {
    adminLogin: Effect;
    logout: Effect;
    handleTimeExpired: Effect;
  };
  reducers: {
    updateState: Reducer<AuthModelState>;
  };
}

const AuthModel: AuthModelType = {
  namespace: 'auth',
  state: {
    adminToken: localStorage.getItem(STORAGE_KEYS.TOKEN) || '',
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
    *adminLogin(action, { call, put, select }) {
      const response = yield call(authApi.admin, action.payload);
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
            adminToken: data.token,
          },
        });

        const newState = yield select((_: any) => _.auth);

        notification.success({
          placement: 'topRight',
          message: 'Login successfully',
        });

        history.push('/home');
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Login is failed',
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
          adminToken: '',
        },
      });

      notification.success({
        placement: 'topRight',
        message: 'Log out successfully',
      });
    },
    *handleTimeExpired(action, { call, put, select }) {
      const currentState = yield select((_: any) => _.auth);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);

      yield put({
        type: 'updateState',
        payload: {
          ...currentState,
          adminToken: '',
        },
      });

      notification.error({
        placement: 'topRight',
        message: 'Thời hạn đăng nhập đã hết hạn, vui lòng đăng nhập lại',
      });
    },
  },
};

export default AuthModel;
