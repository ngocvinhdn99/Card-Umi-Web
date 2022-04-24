import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AccountForm from './AccountForm';

AccountFormComponent.propTypes = {};
interface IMyProps {
  handleUserInfo: Function;
  fakeData: any;
  isLoading: boolean;
}

function AccountFormComponent(props: IMyProps) {
  const { handleUserInfo, isLoading, fakeData } = props;

  return (
    <div>
      <h2>Chào mừng bạn đến với Card Poker Game</h2>
      <h6>Thiết lập tài khoản</h6>
      <AccountForm
        handleUserInfo={handleUserInfo}
        fakeData={fakeData}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AccountFormComponent;
