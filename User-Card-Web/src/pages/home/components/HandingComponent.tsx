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
  handleStartRamdomGames: Function;
  handlePreRamdomgames: Function;
  games: any;
  botSelectType: string;
}

function HandingComponent(props: IMyProps) {
  const {
    botInfo,
    profileInfo,
    handleStartGame,
    games,
    botSelectType,
    handleStartRamdomGames,
    handlePreRamdomgames,
  } = props;
  const {
    botHand,
    playerHand,
    botID,
    playerID,
    winnerID,
    betValue,
    winnerName,
  } = games.gameInfo;
  const { recentGamesList } = games;

  // const [winnerType, setWinnerType] = useState('');
  // useEffect(() => {
  //   if (botID === winnerID) {
  //     setWinnerType('bot');
  //   }
  //   if (playerID === winnerID) {
  //     setWinnerType('player');
  //   }
  // }, [games]);

  const [statusList, setStatusList] = useState({
    isRoll: false,
    isOpen: false,
  });

  const isValuesInBotInfo = Object.keys(botInfo).length;

  const [point, setPoint] = useState([
    {
      name: botInfo.name,
      point: botInfo.remainPoints,
      minBet: botInfo.minBet,
      maxBet: botInfo.maxBet,
      typeText: isValuesInBotInfo ? 'bot' : 'ramdomBot',
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
        typeText: isValuesInBotInfo ? 'bot' : 'ramdomBot',
      },
      {
        name: profileInfo.name,
        point: profileInfo.point,
        totalGame: profileInfo.totalGame,
        winGame: profileInfo.winGame,
        typeText: 'bạn',
      },
    ];

    // Wait to click open or pre ramdom games -> set new point
    const { isRoll, isOpen } = statusList;
    const isValidSetPoint =
      (isRoll && isOpen) ||
      (!isRoll && !isOpen && botSelectType === 'ramdomBot');
    if (isValidSetPoint) {
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
            handleStartRamdomGames={handleStartRamdomGames}
            handlePreRamdomgames={handlePreRamdomgames}
            botSelectType={botSelectType}
            winnerName={winnerName}
          />
        </Col>
        <Col span={10}>
          <PlayerHandComponent
            statusList={statusList}
            pointValue={point[1]}
            playerHand={playerHand}
            recentGamesList={recentGamesList}
          />
        </Col>
      </Row>
    </div>
  );
}

export default HandingComponent;
