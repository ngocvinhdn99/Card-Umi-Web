import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

LoginFormComponent.propTypes = {};

function LoginFormComponent(props: any) {
  const [loginInfo, setLoginInfo] = useState({});

  return (
    <div>
      <h2>Chào mừng bạn đến với Card Poker Game</h2>
      <h6>Đăng nhập</h6>
      <LoginForm />
    </div>
  );
}

export default LoginFormComponent;
