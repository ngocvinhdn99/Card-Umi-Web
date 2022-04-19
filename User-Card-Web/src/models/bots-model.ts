import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { STORAGE_KEYS } from '@/constants/index';
import { notification } from 'antd';
import botsApi from '@/services/bots-api';

interface BotInfo {
  id?: string;
  name?: string;
  MinBet?: number;
  MaxBet?: number;
  totalPoints?: number;
  remainPoints?: number;
}

export interface BotsModelState {
  botInfo?: BotInfo;
  botList?: any;
}

export interface BotModelType {
  namespace: 'bots';
  state: BotsModelState;
  effects: {
    getBotList: Effect;
    getBotById: Effect;
  };
  reducers: {
    updateState: Reducer<BotsModelState>;
  };
}

const AuthModel: BotModelType = {
  namespace: 'bots',
  state: {
    botInfo: {},
    botList: [],
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
      const { data, message } = response;

      if (data) {
        const currentState = yield select((_: any) => _.bots);

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            botList: data,
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
      const response = yield call(botsApi.getBotById, action.payload.botId);
      const { data, message } = response;

      if (data) {
        const currentState = yield select((_: any) => _.bots);

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            botInfo: data,
          },
        });

        notification.success({
          placement: 'topRight',
          message: 'Select bot successfully',
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Get Bot failed',
          description: message,
        });
      }
    },
  },
};

export default AuthModel;
