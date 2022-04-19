import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import { Row, Col } from 'antd';
import BotHandComponent from './BotHandComponent';
import DividerComponent from './DividerComponent';
import PlayerHandComponent from './PlayerHandComponent';

HandingComponent.propTypes = {};

function HandingComponent(props: any) {
  const [bet, setBet] = useState(0);
  const [statusList, setStatusList] = useState({
    isRoll: false,
    isOpen: false,
  });

  const [point, setPoint] = useState([
    {
      name: 'bot',
      value: 30,
    },
    {
      name: 'player',
      value: 20,
    },
  ]);

  const handleChangeBet = (newBet: any) => {
    setBet(newBet);
  };

  return (
    <div className={styles.wrapper}>
      <Row gutter={[16, 16]} className={styles.rowAnt}>
        <Col span={10}>
          <BotHandComponent statusList={statusList} pointValue={point[0]} />
        </Col>
        <Col span={4}>
          <DividerComponent
            setStatusList={setStatusList}
            statusList={statusList}
            point={point}
            bet={bet}
            handleChangeBet={handleChangeBet}
          />
        </Col>
        <Col span={10}>
          <PlayerHandComponent statusList={statusList} pointValue={point[1]} />
        </Col>
      </Row>
    </div>
  );
}

export default HandingComponent;
