import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image } from 'antd';
import 'antd/dist/antd.css';
import { homeImg } from '@/constants/index';
import RegisterFormComponent from './components/RegisterFormComponent';
import { history } from 'umi';

RegisterComponent.propTypes = {};

function RegisterComponent(props: any) {
  const handleNavigate = () => {
    history.push('/login');
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Image src={homeImg} preview={false} />
        </Col>
        <Col span={10}>
          <RegisterFormComponent />
          <h6 onClick={handleNavigate}>
            Đã có có tài khoản rồi ? Đăng nhập ngay
          </h6>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterComponent;
