import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Menu,
  Breadcrumb,
  Typography,
  Button,
  notification,
} from 'antd';
import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  RobotOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import BotTableComponent from './components/BotTableComponent';
import PlayerTableComponent from './components/PlayerTableComponent';
import GameTableComponent from './components/GameTableComponent';
import ProfileTableComponent from './components/ProfileTableComponent';
import {
  Dispatch,
  BotsModelState,
  Loading,
  history,
  Redirect,
  GamesModelState,
  AuthModelState,
} from 'umi';
import { connect } from 'dva';
import { STORAGE_KEYS, useTokenCheck } from '@/constants/index';
import styles from './index.less';

HomeComponent.propTypes = {};

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  bots: BotsModelState;
  profile: any;
  games: GamesModelState;
  auth: AuthModelState;
}

const { Title } = Typography;
const { Content, Footer, Sider } = Layout;

function HomeComponent({
  auth,
  bots,
  profile,
  games,
  dispatch,
  loading,
}: Props) {
  const [tab, setTab] = useState('bot');
  const { botList, pagination: botsPagination } = bots;
  const { profileList, pagination: profilePagination } = profile;
  const { gameList, pagination: gamesPagination } = games;

  const handleTokenValid = () => {
    const tokenInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN)!);
    const validToken = useTokenCheck(tokenInfo);
    if (!validToken) {
      if (auth.adminToken) {
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

  const handleChangeTab = (clickedTab: any) => {
    setTab(clickedTab);
  };

  const handleBotsModelApi = async (type: string, data: any) => {
    const validToken = handleTokenValid();

    if (!validToken) return;
    switch (type) {
      case 'create':
        await dispatch({
          type: 'bots/handleCreate',
          payload: {
            data,
            token: validToken,
          },
        });
        break;
      case 'update':
        await dispatch({
          type: 'bots/handleUpdate',
          payload: {
            data,
            token: validToken,
          },
        });
        break;
      case 'delete':
        await dispatch({
          type: 'bots/handleDelete',
          payload: {
            data,
            token: validToken,
          },
        });
        break;
    }
  };

  const handleProfileModelApi = async (type: string, data: any) => {
    const validToken = handleTokenValid();

    if (!validToken) return;
    switch (type) {
      case 'update':
        await dispatch({
          type: 'profile/handleUpdate',
          payload: {
            data,
            token: validToken,
          },
        });
        break;
      case 'delete':
        await dispatch({
          type: 'profile/handleDelete',
          payload: {
            data,
            token: validToken,
          },
        });
        break;
    }
  };

  const handleGetAllApi = async (type: string, params: any) => {
    const validToken = handleTokenValid();

    if (!validToken) return;
    switch (type) {
      case 'bots':
        dispatch({
          type: 'bots/handleGetAll',
          payload: {
            token: validToken,
            params,
          },
        });
        break;
      case 'profile':
        dispatch({
          type: 'profile/handleGetAll',
          payload: {
            token: validToken,
            params,
          },
        });
        break;
      case 'games':
        dispatch({
          type: 'games/handleGetAll',
          payload: {
            token: validToken,
            params,
          },
        });
        break;
    }
  };

  return (
    <div>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          className={styles.siderContainer}
        >
          <div>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {/* <Title level={4}>Card Admin Web</Title> */}
              <Menu.Item
                key="1"
                icon={<RobotOutlined />}
                onClick={() => handleChangeTab('bot')}
              >
                Bot
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<UserOutlined />}
                onClick={() => handleChangeTab('profile')}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<AppstoreOutlined />}
                onClick={() => handleChangeTab('games')}
              >
                Games
              </Menu.Item>
            </Menu>
          </div>

          <div>
            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              danger
              style={{ width: '100%' }}
              onClick={() => {
                dispatch({
                  type: 'auth/logout',
                });
                history.push('/login');
              }}
            >
              Log out
            </Button>
          </div>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Breadcrumb.Item>
            </Breadcrumb>

            {tab === 'bot' && (
              <BotTableComponent
                botList={botList}
                handleBotsModelApi={handleBotsModelApi}
                paginationModel={botsPagination}
                handleGetAllApi={handleGetAllApi}
                loading={loading}
              />
            )}
            {tab === 'profile' && (
              <ProfileTableComponent
                profileList={profileList}
                handleProfileModelApi={handleProfileModelApi}
                paginationModel={profilePagination}
                loading={loading}
                handleGetAllApi={handleGetAllApi}
              />
            )}
            {tab === 'games' && (
              <GameTableComponent
                gameList={gameList}
                paginationModel={gamesPagination}
                handleGetAllApi={handleGetAllApi}
                loading={loading}
              />
            )}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      ,
    </div>
  );
}

// export default HomeComponent;
export default connect(({ auth, bots, profile, games, loading }: any) => ({
  auth,
  bots,
  profile,
  games,
  loading,
}))(HomeComponent);
