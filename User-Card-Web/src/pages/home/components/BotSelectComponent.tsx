import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Menu,
  Dropdown,
  Button,
  Avatar,
  Pagination,
  Typography,
} from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import styles from '../styles.less';

interface IPagination {
  page?: number;
  limit?: number;
}

interface Props {
  botList: any;
  handleGetBotById: Function;
  pagination: IPagination;
  handleNewPagination: Function;
  botsPagination: any;
}
const { Title } = Typography;

const BotSelectComponent: React.FC<Props> = ({
  botList,
  handleGetBotById,
  pagination,
  handleNewPagination,
  botsPagination,
}) => {
  const handleClickBot = (botId: string) => {
    handleGetBotById(botId);
  };

  const handleChangePage = (newPage: number) => {
    handleNewPagination(newPage);
  };

  return (
    <div className={styles.botSelectRoot}>
      <div>
        {/* <Title level={3} className={styles.botSelectTitle} type="danger">
          Chào mừng bạn đã đến với Poker Card Game
        </Title> */}
        {/* <Title level={4} className={styles.botSelectSubTitle} type="warning">
          Vui lòng chọn Bot mà bạn mong muốn chơi !
        </Title> */}
      </div>
      <Row gutter={[16, 16]} className={styles.botSelectContainer}>
        {botList.map((value: any, key: any) => (
          <Col
            span={6}
            key={key}
            className={styles.eachBot}
            onClick={() => handleClickBot(value.id)}
          >
            <Avatar icon={<RobotOutlined />} size="large" />
            <div>{value.name}</div>
            <div>{value.remainPoints} Point</div>
            <div>
              Min Bet: {value.minBet} Point | Max Bet: {value.maxBet} Point
            </div>
          </Col>
        ))}
      </Row>
      <Pagination
        current={pagination.page}
        pageSize={pagination.limit}
        total={botsPagination.total}
        onChange={handleChangePage}
        className={styles.botSelectPagination}
      />
    </div>
  );
};

export default BotSelectComponent;
