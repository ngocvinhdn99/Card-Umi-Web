import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';

RegisterFormComponent.propTypes = {};

function RegisterFormComponent(props: any) {
  const [registerInfo, setRegisterInfo] = useState({});

  return (
    <div>
      <h2>Chào mừng bạn đến với Card Poker Game</h2>
      <h6>Đăng ký</h6>
      <RegisterForm />
    </div>
  );
}

export default RegisterFormComponent;
