import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import { Row, Col } from 'antd';
import BotHandComponent from './components/BotHandComponent';
import DividerComponent from './components/DividerComponent';
import PlayerHandComponent from './components/PlayerHandComponent';
import request from 'umi-request';

HomeComponent.propTypes = {};

function HomeComponent(props: any) {
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

  // console.log('Vinh test API');
  // request('http://localhost:5000/v1/productCategory/625bb3f77216350614d4b817', {
  //   method: 'delete',
  // })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return (
    <div className={styles.root}>
      <div className={styles.container}>
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
            <PlayerHandComponent
              statusList={statusList}
              pointValue={point[1]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomeComponent;

{
  /* <div className={styles.playerPanel}>
          <div className={styles.playerName}>Winner</div>
          <div className={styles.playerScore}>43</div>
          <div className={styles.playerCurrentBox}>
            <div className={styles.playerCurrentLabel}>Current</div>
            <div className={styles.playerCurrentScore}>11</div>
          </div>
        </div>

        <div className={styles.playerPanel}>
          <div className={styles.playerName}>Player 2</div>
          <div className={styles.playerScore}>72</div>
          <div className={styles.playerCurrentBox}>
            <div className={styles.playerCurrentLabel}>Current</div>
            <div className={styles.playerCurrentScore}>0</div>
          </div>
        </div>

        <button className={styles.btnNew}>New game</button>
        <button className={styles.btnRoll}>
          <i className={styles.ionIosLoop}></i>Roll dice
        </button>
        <button className={styles.btnHold}>
          <i className={styles.ionIosDownloadOutline}></i>Hold
        </button>

        <input
          type="number"
          placeholder="Final score"
          className={styles.finalScore}
        /> */
}
