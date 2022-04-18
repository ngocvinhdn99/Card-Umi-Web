import { FolderOpenOutlined, RedoOutlined } from '@ant-design/icons';
import { Image, Typography, Input, Button } from 'antd';
import React, { useState, useRef } from 'react';
import styles from '../styles.less';
import imageList from '../../cardImgList';

const { Title } = Typography;
DividerComponent.propTypes = {};
interface IMyProps {
  setStatusList: any;
  statusList: any;
  point: any;
  bet: any;
  handleChangeBet: any;
}

function DividerComponent(props: IMyProps) {
  const { setStatusList, statusList, point, bet, handleChangeBet } = props;
  const { isRoll, isOpen } = statusList;
  const botImageRef = useRef(document.createElement('div'));

  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isError, setIsError] = useState({
    status: false,
    textError: '',
    errorType: '',
  });

  const handleResetError = () => {
    const notError = {
      status: false,
      textError: '',
      errorType: '',
    };
    setIsError(notError);
  };

  const handleChangeBetValue = (e: any) => {
    const valueNumber = Number(e.target.value);
    handleChangeBet(valueNumber);

    if (valueNumber === 0) {
      const newError = {
        status: true,
        textError: 'Vui lòng nhập số lượng bet lớn hơn 0',
        errorType: 'bet',
      };
      setIsError(newError);
      return;
    }

    const indexError = point.findIndex(
      (value: any) => value.value < valueNumber,
    );
    if (indexError >= 0) {
      const type = point[indexError].name;
      const newError = {
        status: true,
        textError: `Vui lòng nhập số lượng bet nhỏ hơn point của ${type}`,
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
      botImageRef.current.animate(
        [{ transform: 'scale(0.5) translate(-400%, -100%)' }],
        {
          duration: 900,
        },
      );
      setTimeout(() => {
        botImageRef.current.animate(
          [{ transform: 'scale(0.5) translate(400%, -100%)' }],
          {
            duration: 900,
          },
        );
      }, 1000);
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

  return (
    <div className={styles.dividerRoot}>
      <Title level={5}>Game no 1</Title>
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
        <Title level={5}>Bet Quantity</Title>
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
