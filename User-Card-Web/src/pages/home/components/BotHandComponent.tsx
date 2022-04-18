import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Image, Row, Col } from 'antd';
import styles from '../styles.less';
import imageList from '../../cardImgList';

const { Title } = Typography;

BotHandComponent.propTypes = {};
interface IMyProps {
  statusList: any;
  pointValue: any;
}

function BotHandComponent(props: IMyProps) {
  const { statusList, pointValue } = props;
  const { isRoll, isOpen } = statusList;
  const { value } = pointValue;
  const [imgBackSrc, setImgBackSrc] = useState(imageList.imageRB);

  const imageRef1 = useRef(document.createElement('div'));
  const imageRef2 = useRef(document.createElement('div'));
  const imageRef3 = useRef(document.createElement('div'));

  useEffect(() => {
    if (isRoll && !isOpen) {
      setTimeout(() => {
        setImgBackSrc(imageList.imageBB);
      }, 1000);
    }

    if (isRoll && isOpen) {
      setTimeout(() => {
        setImgBackSrc(imageList.imageAH);
      }, 300);
    }
  }, [statusList]);

  useEffect(() => {
    if (isRoll && isOpen) {
      imageRef1.current.animate([{ transform: 'rotate(0deg) scaleX(-1)' }], {
        duration: 1000,
      });

      imageRef2.current.animate([{ transform: 'rotate(0deg) scaleX(-1)' }], {
        duration: 1000,
      });

      imageRef3.current.animate([{ transform: 'rotate(0deg) scaleX(-1)' }], {
        duration: 1000,
      });
    }
  }, [statusList]);

  return (
    <div className={styles.handRoot}>
      <Title level={5}>Bot Ngoc Vinh</Title>
      <div>
        <Row gutter={[8, 8]}>
          <Col span={8} className={styles.testAnimation} ref={imageRef1}>
            <Image
              src={imgBackSrc}
              preview={false}
              className={styles.testAnimation}
            />
          </Col>
          <Col span={8} ref={imageRef2}>
            <Image src={imgBackSrc} preview={false} />
          </Col>
          <Col span={8} ref={imageRef3}>
            <Image src={imgBackSrc} preview={false} />
          </Col>
        </Row>
      </div>
      <div className={styles.remainPointContainer}>
        <div className={styles.remainPointTitle}>Remain Point</div>
        <div className={styles.remainPointNumber}>{value}</div>
      </div>
    </div>
  );
}

export default BotHandComponent;
