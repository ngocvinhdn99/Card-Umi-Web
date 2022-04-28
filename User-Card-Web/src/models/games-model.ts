import { Effect, Reducer } from 'umi';
import { routerRedux } from 'dva/router';
import { STORAGE_KEYS } from '@/constants/index';
import { notification } from 'antd';
import gamesApi from '@/services/games-api';

interface GameInfo {
  ID?: string;
  GameNo?: string;
  PlayerID?: string;
  BotID?: string;
  WinnerID?: string;
  PlayerHand?: any;
  BotHand?: any;
  BetValue?: number;
}

export interface GamesModelState {
  gameInfo?: GameInfo;
  recentGamesList?: any;
}

export interface GamesModelType {
  namespace: 'games';
  state: GamesModelState;
  effects: {
    startGameByBotId: Effect;
    startRamdomGame: Effect;
    getRecentGames: Effect;
  };
  reducers: {
    updateState: Reducer<GamesModelState>;
  };
}

const GamesModel: GamesModelType = {
  namespace: 'games',
  state: {
    gameInfo: {},
    recentGamesList: [],
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
    *startGameByBotId(action, { call, put, select }) {
      const response = yield call(gamesApi.startById, action.payload);
      const { data, message } = response;

      if (data) {
        const currentState = yield select((_: any) => _.games);

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            gameInfo: data,
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
    *startRamdomGame({ payload, callback }, { call, put, select }) {
      const response = yield call(gamesApi.startRamdom, payload);
      const { data, message } = response;
      const currentState = yield select((_: any) => _.games);

      if (data) {
        callback?.(data.botID);

        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            gameInfo: data,
          },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            gameInfo: {},
          },
        });

        notification.error({
          placement: 'topRight',
          message: 'Start game failed',
          description: message,
        });
      }
    },
    *getRecentGames({ payload }, { call, put, select }) {
      const response = yield call(gamesApi.getRecentGames, payload);
      const { data, message } = response;
      const currentState = yield select((_: any) => _.games);

      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            ...currentState,
            recentGamesList: data,
          },
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Get recent game failed',
          description: message,
        });
      }
    },
  },
};

export default GamesModel;
