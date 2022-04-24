import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { STORAGE_KEYS } from '@/constants/index';
import { notification } from 'antd';
import gamesApi from '@/services/games-api';

interface IPagination {
  total?: number;
  page?: number;
  limit?: number;
}

export interface GamesModelState {
  gameList?: any;
  pagination?: IPagination;
}

export interface GamesModelType {
  namespace: 'games';
  state: GamesModelState;
  effects: {
    handleGetAll: Effect;
  };
  reducers: {
    updateState: Reducer<GamesModelState>;
  };
}

const GamesModel: GamesModelType = {
  namespace: 'games',
  state: {
    gameList: [],
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
      const response = yield call(gamesApi.getAll, action.payload);
      const { data, message } = response;

      if (data) {
        const currentState = yield select((_: any) => _.games);
        const { list, paginationInfo } = data;

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            gameList: list,
            pagination: {
              total: paginationInfo.total,
            },
          },
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Start game failed',
          description: message,
        });
      }
    },
  },
};

export default GamesModel;
