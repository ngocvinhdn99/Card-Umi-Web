import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image } from 'antd';
import 'antd/dist/antd.css';
import { homeImg } from '@/constants/index';
import LoginFormComponent from './components/LoginFormComponent';
import { history, Dispatch, AuthModelState, Loading } from 'umi';
import { connect } from 'dva';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  auth: AuthModelState;
}

const LoginComponent: React.FC<Props> = ({ auth, dispatch, loading }) => {
  const handleNavigate = () => {
    history.push('/register');
  };

  const isLoading = !!loading.effects['auth/login'];

  const handleUserInfo = (data: object) => {
    dispatch({
      type: 'auth/login',
      payload: data,
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Image src={homeImg} preview={false} />
        </Col>
        <Col span={10}>
          <LoginFormComponent
            handleUserInfo={handleUserInfo}
            isLoading={isLoading}
          />
          <h6 onClick={handleNavigate}>Chưa có tài khoản ? Đăng ký ngay</h6>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ auth, loading }: any) => ({
  auth,
  loading,
}))(LoginComponent);
