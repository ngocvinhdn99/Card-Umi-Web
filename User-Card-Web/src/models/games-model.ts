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
}

export interface GamesModelType {
  namespace: 'games';
  state: GamesModelState;
  effects: {
    startGameByBotId: Effect;
  };
  reducers: {
    updateState: Reducer<GamesModelState>;
  };
}

const GamesModel: GamesModelType = {
  namespace: 'games',
  state: {
    gameInfo: {},
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
  },
};

export default GamesModel;
