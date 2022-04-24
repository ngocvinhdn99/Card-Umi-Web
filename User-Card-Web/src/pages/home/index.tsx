import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import HandingComponent from './components/HandingComponent';
import BotSelectComponent from './components/BotSelectComponent';
import { STORAGE_KEYS, useTokenCheck } from '@/constants/index';
import { Redirect } from 'umi';
import { Menu, Dropdown, Button, notification } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import {
  Dispatch,
  BotsModelState,
  Loading,
  history,
  ProfileModelState,
  GamesModelState,
} from 'umi';
import { connect } from 'dva';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  bots: BotsModelState;
  profile: ProfileModelState;
  games: GamesModelState;
  auth: any;
}

const HomeComponent: React.FC<Props> = ({
  bots,
  dispatch,
  loading,
  profile,
  games,
  auth,
}) => {
  const { botList, botInfo, pagination: botsPagination } = bots;
  const { profileInfo } = profile;
  const idBot = botInfo?.id;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
  });

  const handleTokenValid = () => {
    const tokenInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN)!);
    const validToken = useTokenCheck(tokenInfo);
    if (!validToken) {
      if (auth.userToken) {
        dispatch({
          type: 'auth/handleTimeExpired',
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Vui lòng đăng nhập tài khoản để truy cập đến trang chủ',
        });
      }

      history.push('/login');
      return null;
    } else {
      return validToken;
    }
  };

  useEffect(() => {
    const isRun = handleTokenValid();
    if (!isRun) return;

    handleGetProfileByToken();
  }, []);

  // const isTokenValid = handleTokenValid();
  // if (!isTokenValid) {
  //   return <Redirect to="/login" />;
  // }

  const handleNewPagination = (newPage: number) => {
    const newPagination = {
      ...pagination,
      page: newPage,
    };
    setPagination(newPagination);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            history.push('/account');
          }}
        >
          <UserSwitchOutlined /> Account
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            dispatch({
              type: 'auth/logout',
            });
          }}
        >
          <LogoutOutlined /> Log out
        </a>
      </Menu.Item>
    </Menu>
  );

  const handleGetProfileByToken = () => {
    const isTokenValid = handleTokenValid();
    if (isTokenValid) {
      dispatch({
        type: 'profile/getProfileByToken',
        payload: {
          token: isTokenValid,
        },
      });
      return true;
    } else {
      return false;
    }
  };

  // useEffect(() => {
  //   handleGetProfileByToken();
  // }, []);

  useEffect(() => {
    // no handleTokenvalid -> just only give token, not handle dva noti
    const tokenInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN)!);
    const validToken = useTokenCheck(tokenInfo);

    if (validToken) {
      dispatch({
        type: 'bots/getBotList',
        payload: {
          pagination,
          token: validToken,
        },
      });
    }
  }, [pagination]);

  const handleGetBotById = (botId: any) => {
    const isTokenValid = handleTokenValid();
    if (isTokenValid) {
      dispatch({
        type: 'bots/getBotById',
        payload: {
          botId,
          token: isTokenValid,
        },
      });
      return true;
    } else {
      return false;
    }
  };

  const handleStartGame = async (betValue: number) => {
    const botId = botInfo?.id;
    const isTokenValid = handleTokenValid();
    const handleRedirect = () => {
      history.push('/login');
    };

    if (isTokenValid) {
      await dispatch({
        type: 'games/startGameByBotId',
        payload: {
          betValue,
          botId,
          token: isTokenValid,
        },
      });
    } else {
      return handleRedirect();
    }

    const isRunGetBot = await handleGetBotById(botId);
    if (!isRunGetBot) {
      return handleRedirect();
    }

    const isRunGetProfile = await handleGetProfileByToken();
    if (!isRunGetProfile) {
      return handleRedirect();
    }
    // await dispatch({
    //   type: 'games/startGameByBotId',
    //   payload: {
    //     betValue,
    //     botId,
    //   },
    // });
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button className={styles.accountBtn}>
            <UserOutlined /> Huynh Ngoc Vinh <DownOutlined />
          </Button>
        </Dropdown>

        {!idBot && (
          <BotSelectComponent
            botList={botList}
            handleGetBotById={handleGetBotById}
            pagination={pagination}
            botsPagination={botsPagination}
            handleNewPagination={handleNewPagination}
          />
        )}

        {idBot && (
          <HandingComponent
            botInfo={botInfo}
            profileInfo={profileInfo}
            handleStartGame={handleStartGame}
            games={games}
          />
        )}
      </div>
    </div>
  );
};

export default connect(({ auth, bots, profile, games, loading }: any) => ({
  auth,
  bots,
  profile,
  games,
  loading,
}))(HomeComponent);
