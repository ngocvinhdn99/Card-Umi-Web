import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import playersApi from '@/services/players-api';

export interface PlayersModelState {
  playerInfo?: any;
}

export interface PlayersModelType {
  namespace: 'players';
  state: PlayersModelState;
  effects: {
    handleUpdate: Effect;
  };
  reducers: {
    updateState: Reducer<PlayersModelState>;
  };
}

const PlayersModel: PlayersModelType = {
  namespace: 'players',
  state: {
    playerInfo: {},
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
    *handleUpdate(action, { call, put, select }) {
      const response = yield call(playersApi.update, action.payload);
      const { data, message } = response;

      if (message === 'success') {
        notification.success({
          placement: 'topRight',
          message: 'Update Player Successfully',
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Update Player Failed',
          description: message,
        });
      }
    },
  },
};

export default PlayersModel;
