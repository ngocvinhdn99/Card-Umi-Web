import { FolderOpenOutlined, RedoOutlined } from '@ant-design/icons';
import { Image, Typography, Input, Button, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles.less';
import imageList from '@/configs/image';

const { Title } = Typography;
DividerComponent.propTypes = {};
interface IMyProps {
  setStatusList: any;
  statusList: any;
  point: any;
  handleStartGame: Function;
  handleStartRamdomGames: Function;
  botSelectType: string;
  handlePreRamdomgames: Function;
  games: any;
}

function DividerComponent(props: IMyProps) {
  const {
    setStatusList,
    statusList,
    point,
    handleStartGame,
    handleStartRamdomGames,
    botSelectType,
    handlePreRamdomgames,
    games,
  } = props;
  const [bet, setBet] = useState(0);
  const [gameCount, setGameCount] = useState(1);

  const { isRoll, isOpen } = statusList;
  const { gameInfo } = games;
  const botImageRef = useRef(document.createElement('div'));

  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isError, setIsError] = useState({
    status: false,
    textError: '',
    errorType: '',
  });
  const isTypeBotSelect = botSelectType === 'botSelect';

  const handleResetError = () => {
    const notError = {
      status: false,
      textError: '',
      errorType: '',
    };
    setIsError(notError);
  };

  useEffect(() => {
    const { winnerName } = gameInfo;
    if (isRoll && isOpen && winnerName) {
      message.success(`Chúc mừng ${winnerName} đã chiến thắng game này`);
    }
  }, [gameInfo]);

  const handleChangeBetValue = (e: any) => {
    const valueNumber = Number(e.target.value);
    setBet(valueNumber);

    if (valueNumber === 0) {
      const newError = {
        status: true,
        textError: 'Vui lòng nhập số lượng bet lớn hơn 0',
        errorType: 'bet',
      };
      setIsError(newError);
      return;
    }

    // Case bet Value > point of player || remainPoint of bot
    const indexError = point.findIndex((each: any) => each.point < valueNumber);
    if (indexError >= 0) {
      const typeText = point[indexError].typeText;
      const newError = {
        status: true,
        textError: `Vui lòng nhập số lượng bet nhỏ hơn point của ${typeText}`,
        errorType: 'bet',
      };
      setIsError(newError);
      return;
    }

    // Case bet Value not include from min to max of bot
    const isValidMinMax =
      point[0].minBet <= valueNumber && point[0].maxBet >= valueNumber;
    if (!isValidMinMax && isTypeBotSelect) {
      const newError = {
        status: true,
        textError: `Vui lòng nhập giá trị bet chơi trong khoảng min-max của Bot`,
        errorType: 'bet',
      };
      setIsError(newError);
      return;
    }

    handleResetError();
  };

  const handleChangeStatus = (type: any) => {
    // not complete type bet -> not disabled -> no handle
    if (!isDisabledInput) {
      const newError = {
        status: true,
        textError: 'Vui lòng nhập số lượng bet muốn cược',
        errorType: 'bet',
      };
      setIsError(newError);
      return;
    }

    // Error bet -> no handle
    const { status, errorType } = isError;
    if (status && errorType === 'bet') {
      return;
    }

    // Case click open when not click roll
    if (type === 'isOpen' && !isRoll && !isOpen) {
      const newError = {
        status: true,
        textError: 'Vui lòng nhấn Roll để chia bài trước khi mở bài',
        errorType: 'open',
      };
      setIsError(newError);
      return;
    }

    // Case click roll when clicked roll before
    if (type === 'isRoll' && isRoll && !isOpen) {
      const newError = {
        status: true,
        textError: 'Bài đã được chia, vui lòng nhấn Open để xem kết quả',
        errorType: 'roll',
      };
      setIsError(newError);
      return;
    }

    // Case not handle setState
    if (isRoll && isOpen) {
      return;
    }

    // Case click roll normally -> animation for bot card image
    if (type === 'isRoll' && !isRoll && !isOpen) {
      botImageRef.current?.animate(
        [{ transform: 'scale(0.5) translate(-400%, -100%)' }],
        {
          duration: 900,
        },
      );
      setTimeout(() => {
        botImageRef.current?.animate(
          [{ transform: 'scale(0.5) translate(400%, -100%)' }],
          {
            duration: 900,
          },
        );
      }, 1000);

      // Call API
      if (isTypeBotSelect) {
        handleStartGame(bet);
      } else {
        handleStartRamdomGames(bet);
      }
    }

    setStatusList((prev: any) => ({
      ...prev,
      [type]: true,
    }));
    handleResetError();
  };

  const handlePlaying = () => {
    if (bet <= 0) {
      const newError = {
        status: true,
        textError: 'Vui lòng nhập số lượng bet lớn hơn 0',
        errorType: 'bet',
      };
      setIsError(newError);
      return;
    }

    // Error bet -> no handle
    const { status, errorType } = isError;
    if (status && errorType === 'bet') {
      return;
    }

    setIsDisabledInput(true);
  };

  const handlePlayAgain = () => {
    setIsDisabledInput(false);

    const defaultStatusList = {
      isRoll: false,
      isOpen: false,
    };
    setStatusList(defaultStatusList);

    // Case ramdom bot
    if (!isTypeBotSelect) {
      handlePreRamdomgames();
    }

    // Set bet value default = 0
    setBet(0);

    // Plus game count
    setGameCount((prev) => prev + 1);
  };

  return (
    <div className={styles.dividerRoot}>
      <Title level={5} style={{ textAlign: 'center' }}>
        Game {gameCount}
      </Title>
      <div ref={botImageRef}>
        <Image src={imageList.imageBB} preview={false} />
      </div>
      <div
        className={styles.centerText}
        onClick={(e) => handleChangeStatus('isRoll')}
      >
        <RedoOutlined /> Roll
      </div>
      <div
        className={styles.centerText}
        onClick={(e) => handleChangeStatus('isOpen')}
      >
        <FolderOpenOutlined /> Open
      </div>
      <div>
        <Title level={5} style={{ textAlign: 'center' }}>
          Bet Quantity
        </Title>
        <div className={styles.betContainer}>
          <Input
            disabled={isDisabledInput}
            value={bet}
            onChange={handleChangeBetValue}
            className={isError.status ? styles.isErrorInput : ''}
          />
          <Button
            type="primary"
            className={styles.betBtn}
            onClick={handlePlaying}
          >
            Cược điểm Bet
          </Button>

          <Button
            type="default"
            className={styles.betBtn}
            onClick={handlePlayAgain}
            disabled={!isDisabledInput || !isOpen}
          >
            Chơi tiếp
          </Button>
        </div>
        <div className={styles.errorTextContainer}>
          {isError.status && (
            <span className={styles.error}>{isError.textError}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DividerComponent;
