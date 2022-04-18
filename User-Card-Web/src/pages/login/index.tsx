import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image } from 'antd';
import 'antd/dist/antd.css';
import { homeImg } from '@/constants/index';
import LoginFormComponent from './components/LoginFormComponent';
import { history } from 'umi';

LoginComponent.propTypes = {};

function LoginComponent(props: any) {
  const handleNavigate = () => {
    history.push('/register');
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Image src={homeImg} preview={false} />
        </Col>
        <Col span={10}>
          <LoginFormComponent />
          <h6 onClick={handleNavigate}>Chưa có tài khoản ? Đăng ký ngay</h6>
        </Col>
      </Row>
    </div>
  );
}

export default LoginComponent;
