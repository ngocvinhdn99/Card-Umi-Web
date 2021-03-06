import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Image, Row, Col, Tag } from 'antd';
import styles from '../styles.less';
import imageList from '@/configs/image';

const { Title } = Typography;

BotHandComponent.propTypes = {};
interface IMyProps {
  statusList: any;
  pointValue: any;
  botHand: any;
}

function BotHandComponent(props: IMyProps) {
  let { statusList, pointValue, botHand } = props;
  const [botValues, setBotValues] = useState(pointValue);

  const handlePointValue = () => {
    if (pointValue.typeText === 'ramdomBot') {
      const ramdomBotValues = {
        name: 'Ramdom Bot',
        point: '???',
        minBet: '???',
        maxBet: '???',
        typeText: 'ramdomBot',
      };
      setBotValues(ramdomBotValues);
    } else {
      setBotValues({
        ...pointValue,
      });
    }
  };

  // console.log('pointValue', pointValue);

  useEffect(() => {
    handlePointValue();
  }, [pointValue]);

  const { isRoll, isOpen } = statusList;
  const { name, point, minBet, maxBet } = botValues;
  const [imgBackSrc, setImgBackSrc] = useState({
    first: imageList.imageRB,
    second: imageList.imageRB,
    third: imageList.imageRB,
  });

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
    if (botHand) {
      const { cards } = botHand;
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
        const newImgBackSrc = {
          first: imageList.imageBB,
          second: imageList.imageBB,
          third: imageList.imageBB,
        };
        setImgBackSrc(newImgBackSrc);
      }, 1000);
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
  }, [statusList, botHand]);

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
        <Row gutter={[8, 8]}>
          <Col span={8} className={styles.testAnimation} ref={imageRef1}>
            <Image
              src={imgBackSrc.first}
              preview={false}
              className={styles.testAnimation}
            />
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
        <div className={styles.remainPointTitle}>Remain Point</div>
        <div className={styles.remainPointNumber}>{point}</div>
      </div>
      <div className={styles.botBetContainer}>
        <Tag color="#108ee9">Min Bet: {minBet} Point</Tag>
        <Tag color="#f50">Max Bet: {maxBet} Point</Tag>
      </div>
    </div>
  );
}

export default BotHandComponent;
