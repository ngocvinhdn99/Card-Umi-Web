import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

LoginFormComponent.propTypes = {};
interface IMyProps {
  handleAdminInfo: Function;
  isLoading: boolean;
}

function LoginFormComponent(props: IMyProps) {
  const { handleAdminInfo, isLoading } = props;

  return (
    <div>
      <h2>Chào mừng bạn đến với Card Poker Game dành cho Admin</h2>
      <h6>Đăng nhập</h6>
      <LoginForm handleAdminInfo={handleAdminInfo} isLoading={isLoading} />
    </div>
  );
}

export default LoginFormComponent;
