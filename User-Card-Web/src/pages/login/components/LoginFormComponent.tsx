import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import styles from '../index.less';

LoginFormComponent.propTypes = {};
interface IMyProps {
  handleUserInfo: Function;
  isLoading: boolean;
}

function LoginFormComponent(props: IMyProps) {
  const { handleUserInfo, isLoading } = props;

  return (
    <div>
      <h2>Chào mừng bạn đến với Card Poker Game</h2>
      <h6 className={styles.typeTitle}>Đăng nhập</h6>
      <LoginForm handleUserInfo={handleUserInfo} isLoading={isLoading} />
    </div>
  );
}

export default LoginFormComponent;
