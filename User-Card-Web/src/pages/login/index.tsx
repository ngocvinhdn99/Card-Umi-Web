import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { homeImg } from '@/constants/index';
import LoginFormComponent from './components/LoginFormComponent';
import { history, Dispatch, AuthModelState, Loading } from 'umi';
import { connect } from 'dva';
import styles from './index.less';
import { STORAGE_KEYS, useTokenCheck } from '@/constants/index';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  auth: AuthModelState;
}
const { Title } = Typography;
const { confirm } = Modal;

const LoginComponent: React.FC<Props> = ({ auth, dispatch, loading }) => {
  const handleNavigate = () => {
    history.push('/register');
  };

  const isLoading = !!loading.effects['auth/login'];

  const handleTokenValid = () => {
    const tokenInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN)!);
    const validToken = useTokenCheck(tokenInfo);
    if (validToken) {
      history.push('/home');
      showConfirm();
      return validToken;
    } else {
      return null;
    }
  };

  useEffect(() => {
    handleTokenValid();
  }, []);

  function showConfirm() {
    confirm({
      title: 'Bạn có muốn thoát ra khỏi tài khoản đang đăng nhập ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Tài khoản của bạn hiện đang ở trong trạng thái sử dụng',
      onOk() {
        dispatch({
          type: 'auth/logout',
        });
        history.push('/login');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleUserInfo = (data: object) => {
    dispatch({
      type: 'auth/login',
      payload: data,
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={13}>
          <Image src={homeImg} preview={false} />
        </Col>
        <Col span={11}>
          <LoginFormComponent
            handleUserInfo={handleUserInfo}
            isLoading={isLoading}
          />
          {/* <h6 onClick={handleNavigate}>Chưa có tài khoản ? Đăng ký ngay</h6> */}
          <Title
            level={5}
            onClick={handleNavigate}
            className={styles.navigateTitle}
          >
            Chưa có tài khoản ? Đăng ký ngay
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ auth, loading }: any) => ({
  auth,
  loading,
}))(LoginComponent);
