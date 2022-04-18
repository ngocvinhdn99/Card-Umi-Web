import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import TableComponent from './components/TableComponent';
import BotTableComponent from './components/BotTableComponent';
import PlayerTableComponent from './components/PlayerTableComponent';
import GameTableComponent from './components/GameTableComponent';

HomeComponent.propTypes = {};
const { Title } = Typography;
const { Content, Footer, Sider } = Layout;

function HomeComponent(props: any) {
  const [tab, setTab] = useState('bot');

  const handleChangeTab = (clickedTab: any) => {
    setTab(clickedTab);
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
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {/* <Title level={4}>Card Admin Web</Title> */}
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
              onClick={() => handleChangeTab('bot')}
            >
              Bot
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<TeamOutlined />}
              onClick={() => handleChangeTab('player')}
            >
              Player
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<AppstoreOutlined />}
              onClick={() => handleChangeTab('game')}
            >
              Game
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Breadcrumb.Item>
            </Breadcrumb>
            {/* <TableComponent /> */}

            {tab === 'bot' && <BotTableComponent />}
            {tab === 'player' && <PlayerTableComponent />}
            {tab === 'game' && <GameTableComponent />}
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

export default HomeComponent;
