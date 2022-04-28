import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';
import styles from '../index.less';

RegisterFormComponent.propTypes = {};
interface IMyProps {
  handleUserInfo: Function;
  isLoading: boolean;
}

function RegisterFormComponent(props: IMyProps) {
  const { handleUserInfo, isLoading } = props;

  return (
    <div>
      <h2>Chào mừng bạn đến với Card Poker Game</h2>
      <h6 className={styles.typeTitle}>Đăng ký</h6>
      <RegisterForm handleUserInfo={handleUserInfo} isLoading={isLoading} />
    </div>
  );
}

export default RegisterFormComponent;
