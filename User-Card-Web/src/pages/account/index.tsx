import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image } from 'antd';
import 'antd/dist/antd.css';
import { homeImg } from '@/constants/index';
import AccountFormComponent from './components/AccountFormComponent';
import { history, Dispatch, AuthModelState, Loading } from 'umi';
import { connect } from 'dva';
import { STORAGE_KEYS, useTokenCheck } from '@/constants/index';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  auth: AuthModelState;
}

const AccountComponent: React.FC<Props> = ({ auth, dispatch, loading }) => {
  //   const isLoading = !!loading.effects['auth/login'];
  const isLoading = false;
  const fakeData = {
    name: 'ngoc vinh test',
    email: 'ngocvinhtest@gmail.com',
    password: '12345678a@',
  };

  const handleTokenValid = () => {
    const tokenInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN)!);
    const validToken = useTokenCheck(tokenInfo);
    if (!validToken) {
      if (auth.userToken) {
        dispatch({
          type: 'auth/handleTimeExpired',
        });
      }
      history.push('/login');
      return null;
    } else {
      return validToken;
    }
  };

  useEffect(() => {
    handleTokenValid();
  }, []);

  const handleUserInfo = (data: object) => {
    console.log(data);
    // dispatch({
    //   type: 'auth/login',
    //   payload: data,
    // });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Image src={homeImg} preview={false} />
        </Col>
        <Col span={10}>
          <AccountFormComponent
            handleUserInfo={handleUserInfo}
            fakeData={fakeData}
            isLoading={isLoading}
          />
          {/* <h6 onClick={handleNavigate}>Chưa có tài khoản ? Đăng ký ngay</h6> */}
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ auth, loading }: any) => ({
  auth,
  loading,
}))(AccountComponent);
