import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import HandingComponent from './components/HandingComponent';
import BotSelectComponent from './components/BotSelectComponent';
import { STORAGE_KEYS, useTokenCheck } from '@/constants/index';
import { Redirect } from 'umi';
import { Menu, Dropdown, Button, notification, Typography } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  RobotOutlined,
  RobotFilled,
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
const { Title } = Typography;

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

  const [botSelectType, setBotSelectType] = useState('');
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
    handleGetRecentGames();
  }, []);

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
          <UserSwitchOutlined />
          <span style={{ marginLeft: '32px' }}>Account</span>
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
          <LogoutOutlined />
          <span style={{ marginLeft: '32px' }}>Log out</span>
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

  const handleGetRecentGames = () => {
    const tokenValid = handleTokenValid();
    if (tokenValid) {
      dispatch({
        type: 'games/getRecentGames',
        payload: {
          token: tokenValid,
        },
      });
      return true;
    } else {
      return false;
    }
  };

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

  const handleGetBotById = (botId: any, isHiddenNoti: boolean) => {
    const isTokenValid = handleTokenValid();
    if (isTokenValid) {
      dispatch({
        type: 'bots/getBotById',
        payload: {
          botId,
          token: isTokenValid,
          isHiddenNoti,
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

    const isHiddenNoti = true;
    const isRunGetBot = await handleGetBotById(botId, isHiddenNoti);
    if (!isRunGetBot) {
      return handleRedirect();
    }

    const isRunGetProfile = await handleGetProfileByToken();
    if (!isRunGetProfile) {
      return handleRedirect();
    }

    await handleGetRecentGames();
  };

  const handleGetBotByIdCallBack = (botId: any) => {
    const tokenValid = handleTokenValid();
    if (tokenValid) {
      dispatch({
        type: 'bots/getBotById',
        payload: {
          botId,
          token: tokenValid,
          isHiddenNoti: true,
        },
      });
      return true;
    } else {
      return false;
    }
  };

  const handleStartRamdomGames = async (betValue: number) => {
    const tokenValid = handleTokenValid();
    const handleRedirect = () => {
      history.push('/login');
    };

    if (!tokenValid) return;
    await dispatch({
      type: 'games/startRamdomGame',
      payload: {
        betValue,
        token: tokenValid,
      },
      callback: handleGetBotByIdCallBack,
    });

    const isRunGetProfile = handleGetProfileByToken();
    if (!isRunGetProfile) {
      return handleRedirect();
    }

    handleGetRecentGames();
  };

  const handlePreRamdomgames = () => {
    dispatch({
      type: 'bots/clearBotInfo',
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button className={styles.accountBtn}>
            <UserOutlined /> {profileInfo?.name} <DownOutlined />
          </Button>
        </Dropdown>

        {!(idBot || botSelectType === 'ramdomBot') && (
          <div>
            <Title level={3} className={styles.botSelectTitle} type="danger">
              Chào mừng bạn đã đến với Poker Card Game
            </Title>
            {!botSelectType && (
              <Title
                level={4}
                className={styles.botSelectSubTitle}
                type="warning"
              >
                Vui lòng chọn chế độ mà bạn mong muốn chơi với Bot !
              </Title>
            )}
            {botSelectType === 'botSelect' && (
              <Title
                level={4}
                className={styles.botSelectSubTitle}
                type="warning"
              >
                Vui lòng chọn Bot mà bạn muốn chơi trong danh sách này !
              </Title>
            )}
          </div>
        )}

        {botSelectType !== 'botRamdom' && (
          // {!idBot && botSelectType !== 'botRamdom' && (
          // <div>abc</div>
          <div className={styles.selectBtnContainer}>
            {!idBot && !botSelectType && (
              <div className={styles.selectBtnWrapper}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<RobotOutlined />}
                  size="large"
                  onClick={() => {
                    setBotSelectType('botSelect');
                  }}
                >
                  Chọn Bot chơi
                </Button>

                <Button
                  type="primary"
                  shape="round"
                  icon={<RobotFilled />}
                  size="large"
                  danger
                  onClick={() => {
                    setBotSelectType('ramdomBot');
                  }}
                >
                  Chọn ngẫu nhiên Bot
                </Button>
              </div>
            )}

            {!idBot && botSelectType === 'botSelect' && (
              <BotSelectComponent
                botList={botList}
                handleGetBotById={handleGetBotById}
                pagination={pagination}
                botsPagination={botsPagination}
                handleNewPagination={handleNewPagination}
              />
            )}
          </div>
        )}

        {(idBot || botSelectType === 'ramdomBot') && (
          <HandingComponent
            botInfo={botInfo}
            profileInfo={profileInfo}
            handleStartGame={handleStartGame}
            handleStartRamdomGames={handleStartRamdomGames}
            handlePreRamdomgames={handlePreRamdomgames}
            games={games}
            botSelectType={botSelectType}
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
