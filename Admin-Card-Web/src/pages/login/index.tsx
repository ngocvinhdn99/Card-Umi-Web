import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image, notification, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { homeImg } from '@/constants/index';
import LoginFormComponent from './components/LoginFormComponent';
import { history, Dispatch, AuthModelState, Loading } from 'umi';
import { connect } from 'dva';
import { STORAGE_KEYS, useTokenCheck } from '@/constants/index';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  auth: AuthModelState;
}
const { confirm } = Modal;

const LoginComponent: React.FC<Props> = ({ auth, dispatch, loading }) => {
  const isLoading = !!loading.effects['auth/adminLogin'];

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
      title: 'Bạn có muốn thoát ra khỏi tài khoản admin ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Tài khoản admin hiện đang ở trong trạng thái sử dụng',
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

  const handleAdminInfo = (data: object) => {
    dispatch({
      type: 'auth/adminLogin',
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
            handleAdminInfo={handleAdminInfo}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ auth, loading }: any) => ({
  auth,
  loading,
}))(LoginComponent);
