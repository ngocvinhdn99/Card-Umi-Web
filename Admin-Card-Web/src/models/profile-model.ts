import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import profileApi from '@/services/profile-api';

// interface ProfileInfo {}

export interface ProfileModelState {
  profileList?: any;
  pagination?: Object;
}

export interface ProfileModelType {
  namespace: 'profile';
  state: ProfileModelState;
  effects: {
    handleGetAll: Effect;
    handleUpdate: Effect;
    handleDelete: Effect;
  };
  reducers: {
    updateState: Reducer<ProfileModelState>;
  };
}

const ProfileModel: ProfileModelType = {
  namespace: 'profile',
  state: {
    profileList: [],
    pagination: {},
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
    *handleGetAll(action, { call, put, select }) {
      const response = yield call(profileApi.getAll, action.payload);
      const { data, message, paginationInfo } = response;

      if (data) {
        const currentState = yield select((_: any) => _.profile);
        // const { list, paginationInfo } = data;

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            profileList: data,
            pagination: {
              total: paginationInfo.total,
            },
          },
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Get Profile List is failed',
          description: message,
        });
      }
    },
    *handleUpdate(action, { call, put, select }) {
      const response = yield call(profileApi.update, action.payload);
      const { data, message } = response;
      if (message === 'success') {
        notification.success({
          placement: 'topRight',
          message: 'Update Profile Successfully',
        });

        yield put({
          type: 'handleGetAll',
          payload: action.payload,
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Update Profile Failed',
          description: message,
        });
      }
    },
    *handleDelete(action, { call, put, select }) {
      const response = yield call(profileApi.delete, action.payload);
      const { data, message } = response;
      if (message === 'success') {
        notification.success({
          placement: 'topRight',
          message: 'Delete Profile Successfully',
        });

        yield put({
          type: 'handleGetAll',
          payload: action.payload,
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Delete Profile Failed',
          description: message,
        });
      }
    },
  },
};

export default ProfileModel;
