import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { STORAGE_KEYS } from '@/constants/index';
import { notification } from 'antd';
import profileApi from '@/services/profile-api';

interface ProfileInfo {
  id?: string;
  name?: string;
  email?: number;
  point?: number;
  totalGame?: number;
  winGame?: number;
  winRate?: number;
}

export interface ProfileModelState {
  profileInfo?: ProfileInfo;
}

export interface ProfileModelType {
  namespace: 'profile';
  state: ProfileModelState;
  effects: {
    getProfileByToken: Effect;
  };
  reducers: {
    updateState: Reducer<ProfileModelState>;
  };
}

const ProfileModel: ProfileModelType = {
  namespace: 'profile',
  state: {
    profileInfo: {},
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
    *getProfileByToken(action, { call, put, select }) {
      const response = yield call(profileApi.get, action.payload);
      const { data, message } = response;

      if (data) {
        const currentState = yield select((_: any) => _.profile);

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            profileInfo: data,
          },
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Get Profile failed',
          description: message,
        });
      }
    },
  },
};

export default ProfileModel;
