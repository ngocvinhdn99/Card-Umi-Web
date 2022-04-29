import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Image, Row, Col, Tag, Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from '../styles.less';
import imageList from '@/configs/image';
import HistoryGameComponent from './HistoryGameComponent';

PlayerHandComponent.propTypes = {};
const { Title } = Typography;
interface IMyProps {
  statusList: any;
  pointValue: any;
  playerHand: any;
  recentGamesList: any;
}

function PlayerHandComponent(props: IMyProps) {
  const { statusList, pointValue, playerHand, recentGamesList } = props;
  const { isRoll, isOpen } = statusList;
  const { name, point, totalGame, winGame } = pointValue;
  const [imgBackSrc, setImgBackSrc] = useState({
    first: imageList.imageRB,
    second: imageList.imageRB,
    third: imageList.imageRB,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setImgBackSrc({
      first: imageList.imageRB,
      second: imageList.imageRB,
      third: imageList.imageRB,
    });
    return () => {
      setImgBackSrc({
        first: '',
        second: '',
        third: '',
      }); // This worked for me
    };
  }, []);

  const imageRef1 = useRef(document.createElement('div'));
  const imageRef2 = useRef(document.createElement('div'));
  const imageRef3 = useRef(document.createElement('div'));

  const handleCardsData = () => {
    if (playerHand) {
      const { cards } = playerHand;
      const firstCard = `card${cards[0].name}${cards[0].suit}`;
      const secondCard = `card${cards[1].name}${cards[1].suit}`;
      const thirdCard = `card${cards[2].name}${cards[2].suit}`;

      const newImgBackSrc = {
        first: imageList[firstCard],
        second: imageList[secondCard],
        third: imageList[thirdCard],
      };
      return newImgBackSrc;
    } else {
      const oldImgBackSrc = {
        first: imageList.imageRB,
        second: imageList.imageRB,
        third: imageList.imageRB,
      };
      return oldImgBackSrc;
    }
  };

  useEffect(() => {
    // When click play again
    if (!isRoll && !isOpen) {
      handleRotateCard();

      setTimeout(() => {
        const newImgBackSrc = {
          first: imageList.imageRB,
          second: imageList.imageRB,
          third: imageList.imageRB,
        };
        setImgBackSrc(newImgBackSrc);
      }, 300);
    }

    // When click roll
    if (isRoll && !isOpen) {
      setTimeout(() => {
        // setImgBackSrc(imageList.imageBB);
        const newImgBackSrc = {
          first: imageList.imageBB,
          second: imageList.imageBB,
          third: imageList.imageBB,
        };
        setImgBackSrc(newImgBackSrc);
      }, 2000);
    }

    // // When click open
    // if (isRoll && isOpen) {
    //   handleRotateCard();

    //   setTimeout(() => {
    //     // setImgBackSrc(imageList.imageAH);
    //     const newCardImg = handleCardsData();
    //     setImgBackSrc(newCardImg);
    //   }, 300);
    // }
  }, [statusList]);

  const handleOpenCard = () => {
    // When click open
    if (isRoll && isOpen) {
      handleRotateCard();

      setTimeout(() => {
        // setImgBackSrc(imageList.imageAH);
        const newCardImg = handleCardsData();
        setImgBackSrc(newCardImg);
      }, 300);
    }
  };

  useEffect(() => {
    handleOpenCard();
  }, [statusList, playerHand]);

  const handleRotateCard = () => {
    imageRef1.current?.animate([{ transform: 'rotate(0deg) scaleX(-1)' }], {
      duration: 1000,
    });

    imageRef2.current?.animate([{ transform: 'rotate(0deg) scaleX(-1)' }], {
      duration: 1000,
    });

    imageRef3.current?.animate([{ transform: 'rotate(0deg) scaleX(-1)' }], {
      duration: 1000,
    });
  };

  return (
    <div className={styles.handRoot}>
      <Title level={5} style={{ textAlign: 'center' }}>
        {name}
      </Title>
      <div>
        <Row gutter={[8, 8]} ref={imageRef1}>
          <Col span={8}>
            <Image src={imgBackSrc.first} preview={false} />
          </Col>
          <Col span={8} ref={imageRef2}>
            <Image src={imgBackSrc.second} preview={false} />
          </Col>
          <Col span={8} ref={imageRef3}>
            <Image src={imgBackSrc.third} preview={false} />
          </Col>
        </Row>
      </div>
      <div className={styles.remainPointContainer}>
        <div className={styles.remainPointTitle}>Point</div>
        <div className={styles.remainPointNumber}>{point}</div>
      </div>
      <div className={styles.playerGameContainer}>
        <Tag color="#87d068">Total Games: {totalGame} Games</Tag>
        <Tag color="#2db7f5">Win Games: {winGame} Games</Tag>
      </div>

      <div className={styles.historyBtnContainer}>
        <Button
          shape="round"
          icon={<SearchOutlined />}
          size="small"
          onClick={showModal}
        >
          Xem lịch sử chơi gần nhất
        </Button>

        <Modal
          title="Lịch sử 5 games gần nhất"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          width={'70%'}
        >
          <HistoryGameComponent data={recentGamesList} />
        </Modal>
      </div>
    </div>
  );
}

export default PlayerHandComponent;
