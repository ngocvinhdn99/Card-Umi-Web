import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import botsApi from '@/services/bots-api';

interface BotInfo {
  ID?: string;
  Name?: string;
  MinBet?: number;
  MaxBet?: number;
  TotalPoints?: number;
  RemainPoints?: number;
}

export interface BotsModelState {
  botInfo?: BotInfo;
  botList?: any;
  pagination?: Object;
}

export interface BotModelType {
  namespace: 'bots';
  state: BotsModelState;
  effects: {
    handleGetAll: Effect;
    handleGet: Effect;
    handleCreate: Effect;
    handleUpdate: Effect;
    handleDelete: Effect;
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
    *handleGetAll(action, { call, put, select }) {
      const response = yield call(botsApi.getAll, action.payload);
      const { data, message } = response;

      if (data) {
        const currentState = yield select((_: any) => _.bots);

        const { paginationInfo, list } = data;

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            botList: list,
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
    *handleGet(action, { call, put, select }) {
      const response = yield call(botsApi.get, action.payload.botId);
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
    *handleCreate(action, { call, put, select }) {
      const response = yield call(botsApi.create, action.payload);
      const { data, message } = response;
      if (message === 'success') {
        notification.success({
          placement: 'topRight',
          message: 'Created Bot Successfully',
        });

        yield put({
          type: 'handleGetAll',
          payload: action.payload,
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Created Bot Failed',
          description: message,
        });
      }
    },
    *handleUpdate(action, { call, put, select }) {
      const response = yield call(botsApi.update, action.payload);
      const { data, message } = response;
      if (message === 'success') {
        notification.success({
          placement: 'topRight',
          message: 'Update Bot Successfully',
        });

        yield put({
          type: 'handleGetAll',
          payload: action.payload,
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Update Bot Failed',
          description: message,
        });
      }
    },
    *handleDelete(action, { call, put, select }) {
      const response = yield call(botsApi.delete, action.payload);
      const { data, message } = response;
      if (message === 'success') {
        notification.success({
          placement: 'topRight',
          message: 'Delete Bot Successfully',
        });

        yield put({
          type: 'handleGetAll',
          payload: action.payload,
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Delete Bot Failed',
          description: message,
        });
      }
    },
  },
};

export default BotsModel;
