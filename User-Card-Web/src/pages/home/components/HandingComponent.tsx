import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.less';
import { Row, Col } from 'antd';
import BotHandComponent from './BotHandComponent';
import DividerComponent from './DividerComponent';
import PlayerHandComponent from './PlayerHandComponent';

HandingComponent.propTypes = {};
interface IMyProps {
  botInfo: any;
  profileInfo: any;
  handleStartGame: Function;
  games: any;
}

function HandingComponent(props: IMyProps) {
  const { botInfo, profileInfo, handleStartGame, games } = props;
  const { botHand, playerHand, botID, playerID, winnerID, betValue } =
    games.gameInfo;

  let winnerType;
  if (botID === winnerID) {
    winnerType = 'bot';
  }
  if (botID === playerID) {
    winnerType = 'player';
  }

  console.log('winnerType', winnerType);

  const [statusList, setStatusList] = useState({
    isRoll: false,
    isOpen: false,
  });

  const [point, setPoint] = useState([
    {
      name: botInfo.name,
      point: botInfo.remainPoints,
      minBet: botInfo.minBet,
      maxBet: botInfo.maxBet,
      typeText: 'bot',
    },
    {
      name: profileInfo.name,
      point: profileInfo.point,
      totalGame: profileInfo.totalGame,
      winGame: profileInfo.winGame,
      typeText: 'bạn',
    },
  ]);

  useEffect(() => {
    const newPoint = [
      {
        name: botInfo.name,
        point: botInfo.remainPoints,
        minBet: botInfo.minBet,
        maxBet: botInfo.maxBet,
        typeText: 'bot',
      },
      {
        name: profileInfo.name,
        point: profileInfo.point,
        totalGame: profileInfo.totalGame,
        winGame: profileInfo.winGame,
        typeText: 'bạn',
      },
    ];

    // Wait to click open -> set new point
    const { isRoll, isOpen } = statusList;
    if (isRoll && isOpen) {
      setPoint(newPoint);
    }
  }, [botInfo, profileInfo, statusList]);

  return (
    <div className={styles.wrapper}>
      <Row gutter={[16, 16]} className={styles.rowAnt}>
        <Col span={10}>
          <BotHandComponent
            statusList={statusList}
            pointValue={point[0]}
            botHand={botHand}
          />
        </Col>
        <Col span={4}>
          <DividerComponent
            setStatusList={setStatusList}
            statusList={statusList}
            point={point}
            handleStartGame={handleStartGame}
          />
        </Col>
        <Col span={10}>
          <PlayerHandComponent
            statusList={statusList}
            pointValue={point[1]}
            playerHand={playerHand}
          />
        </Col>
      </Row>
    </div>
  );
}

export default HandingComponent;
