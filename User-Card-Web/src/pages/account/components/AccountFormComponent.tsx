import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AccountForm from './AccountForm';
import styles from '../index.less';

AccountFormComponent.propTypes = {};
interface IMyProps {
  handleUserInfo: Function;
  profileInfo: any;
  isLoading: boolean;
}

function AccountFormComponent(props: IMyProps) {
  const { handleUserInfo, isLoading, profileInfo } = props;

  return (
    <div>
      <h2>Chào mừng bạn đến với Card Poker Game</h2>
      <h6 className={styles.typeTitle}>Thiết lập tài khoản</h6>
      <AccountForm
        handleUserInfo={handleUserInfo}
        profileInfo={profileInfo}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AccountFormComponent;
