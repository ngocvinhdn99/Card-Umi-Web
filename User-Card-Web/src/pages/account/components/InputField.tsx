import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { Controller } from 'react-hook-form';
import styles from '../index.less';

InputField.propTypes = {};
interface IMyProps {
  form: any;
  name: any;
}

function InputField(props: IMyProps) {
  const { form, name } = props;
  const { errors } = form;
  const hasError = !!errors[name];

  const errorMessage = errors[name]?.message;
  // const isPassWordField = name === 'password';
  const disabledNameList = ['password', 'newPassword', 'retypeNewPassword'];

  const labelList: any = {
    name: 'Name',
    email: 'Email',
    newPassword: 'Mật khẩu mới',
    retypeNewPassword: 'Nhập lại mật khẩu mới',
  };

  return (
    <div>
      <label
        htmlFor=""
        className={name === 'password' ? styles.typeTitle : styles.label}
      >
        {name === 'password'
          ? 'Vui lòng nhập mật khẩu hiện tại'
          : labelList[name]}
      </label>
      <Controller
        name={name}
        control={form.control}
        as={disabledNameList.includes(name) ? Input.Password : Input}
      />
      {hasError && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}

export default InputField;
