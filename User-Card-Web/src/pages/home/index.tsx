import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import HandingComponent from './components/HandingComponent';
import BotSelectComponent from './components/BotSelectComponent';
import { STORAGE_KEYS } from '@/constants/index';
import { Redirect } from 'umi';
import { Menu, Dropdown, Button } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Dispatch, BotsModelState, Loading } from 'umi';
import { connect } from 'dva';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  bots: BotsModelState;
}

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        <UserSwitchOutlined /> Account
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        <LogoutOutlined /> Log out
      </a>
    </Menu.Item>
  </Menu>
);

const HomeComponent: React.FC<Props> = ({ bots, dispatch, loading }) => {
  const { botList, botInfo } = bots;
  const idBot = botInfo?.id;

  useEffect(() => {
    dispatch({
      type: 'bots/getBotList',
    });
  }, []);

  const handleGetBotById = (botId: string) => {
    console.log('botId', botId);
    dispatch({
      type: 'bots/getBotById',
      payload: {
        botId,
      },
    });
  };

  console.log(botInfo);

  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (!token) {
    return <Redirect to="/login" />;
  }

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
          />
        )}

        {idBot && <HandingComponent />}
      </div>
    </div>
  );
};

export default connect(({ bots, loading }: any) => ({
  bots,
  loading,
}))(HomeComponent);
