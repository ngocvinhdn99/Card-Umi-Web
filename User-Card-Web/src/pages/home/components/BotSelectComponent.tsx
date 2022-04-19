import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Menu, Dropdown, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../styles.less';

interface Props {
  botList: any;
  handleGetBotById: Function;
}

const BotSelectComponent: React.FC<Props> = ({ botList, handleGetBotById }) => {
  const handleClickBot = (botId: string) => {
    handleGetBotById(botId);
  };

  return (
    <div className={styles.botSelectRoot}>
      <Row gutter={[16, 16]} className={styles.botSelectContainer}>
        {botList.map((value: any, key: any) => (
          <Col
            span={6}
            key={key}
            className={styles.eachBot}
            onClick={() => handleClickBot(value.id)}
          >
            <Avatar icon={<UserOutlined />} size="large" />
            <div>{value.name}</div>
            <div>{value.remainPoints} Point</div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BotSelectComponent;
