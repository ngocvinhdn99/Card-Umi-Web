import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image, notification } from 'antd';
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
  profile: any;
}

const AccountComponent: React.FC<Props> = ({
  auth,
  profile,
  dispatch,
  loading,
}) => {
  const isLoading = !!loading.effects['players/handleUpdate'];

  const handleTokenValid = () => {
    const tokenInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN)!);
    const validToken = useTokenCheck(tokenInfo);
    if (!validToken) {
      if (auth.userToken) {
        dispatch({
          type: 'auth/handleTimeExpired',
        });
      } else {
        notification.error({
          placement: 'topRight',
          message: 'Vui lòng đăng nhập tài khoản để truy cập đến trang chủ',
        });
      }

      history.push('/login');
      return null;
    } else {
      return validToken;
    }
  };

  const handleGetProfileByToken = () => {
    const isTokenValid = handleTokenValid();
    if (isTokenValid) {
      dispatch({
        type: 'profile/getProfileByToken',
        payload: {
          token: isTokenValid,
        },
      });
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const isRun = handleTokenValid();
    if (!isRun) return;

    handleGetProfileByToken();
  }, []);

  const handleUserInfo = (data: object) => {
    console.log('data', data);
    const validToken = handleTokenValid();
    if (!validToken) return;
    dispatch({
      type: 'players/handleUpdate',
      payload: {
        data,
        token: validToken,
      },
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={13}>
          <Image src={homeImg} preview={false} />
        </Col>
        <Col span={11}>
          <AccountFormComponent
            handleUserInfo={handleUserInfo}
            profileInfo={profile.profileInfo}
            isLoading={isLoading}
          />
          {/* <h6 onClick={handleNavigate}>Chưa có tài khoản ? Đăng ký ngay</h6> */}
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ auth, profile, loading }: any) => ({
  auth,
  profile,
  loading,
}))(AccountComponent);
