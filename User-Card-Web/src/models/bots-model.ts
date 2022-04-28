import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { STORAGE_KEYS } from '@/constants/index';
import { notification } from 'antd';
import botsApi from '@/services/bots-api';

interface BotInfo {
  id?: string;
  name?: string;
  minBet?: number;
  maxBet?: number;
  totalPoints?: number;
  remainPoints?: number;
}

interface IPagination {
  total?: number;
}

export interface BotsModelState {
  botInfo?: BotInfo;
  botList?: any;
  pagination?: IPagination;
}

export interface BotModelType {
  namespace: 'bots';
  state: BotsModelState;
  effects: {
    getBotList: Effect;
    getBotById: Effect;
    clearBotInfo: Effect;
  };
  reducers: {
    updateState: Reducer<BotsModelState>;
  };
}

const BotsModel: BotModelType = {
  namespace: 'bots',
  state: {
    botInfo: {},
    botList: [],
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
    *getBotList(action, { call, put, select }) {
      const response = yield call(botsApi.getListBot, action.payload);
      const { data, message, paginationInfo } = response;

      if (data) {
        const currentState = yield select((_: any) => _.bots);
        // const { list, paginationInfo } = data;

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            botList: data,
            pagination: {
              total: paginationInfo.total,
            },
          },
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Get Bot List is failed',
          description: message,
        });
      }
    },
    *getBotById(action, { call, put, select }) {
      const response = yield call(botsApi.getBotById, action.payload);
      const { data, message } = response;
      const { isHiddenNoti } = action.payload;

      if (data) {
        const currentState = yield select((_: any) => _.bots);

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            botInfo: data,
          },
        });

        if (!isHiddenNoti) {
          notification.success({
            placement: 'topRight',
            message: 'Select bot successfully',
          });
        }
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Get Bot failed',
          description: message,
        });
      }
    },
    *clearBotInfo(action, { call, put, select }) {
      const currentState = yield select((_: any) => _.bots);
      yield put({
        type: 'updateState',
        payload: {
          ...currentState,
          botInfo: {},
        },
      });
    },
  },
};

export default BotsModel;
