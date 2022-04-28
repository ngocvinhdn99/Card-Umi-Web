import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styles from '../index.less';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';

AccountForm.propTypes = {};

interface IData {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  retypeNewPassword: string;
}

interface IMyProps {
  handleUserInfo: Function;
  profileInfo: IData;
  isLoading: boolean;
}

function AccountForm(props: IMyProps) {
  const { handleUserInfo, isLoading, profileInfo } = props;

  const schema: any = yup.object().shape({
    name: yup
      .string()
      .required('Vui lòng nhập thông tin của trường này')
      .min(3, 'Vui lòng nhập thông tin của trường này ít nhất 3 ký tự')
      .max(256, 'Trường này chỉ nhập được tối đa 256 ký tự'),
    email: yup
      .string()
      .email('Vui lòng nhập email hợp lệ')
      .required('Vui lòng nhập thông tin của trường này')
      .min(8, 'Vui lòng nhập thông tin của trường này ít nhất 8 ký tự')
      .max(256, 'Trường này chỉ nhập được tối đa 256 ký tự'),
    password: yup
      .string()
      .min(8, 'Vui lòng nhập ít nhất 8 ký tự')
      .max(256, 'Trường này chỉ nhập tối đa 256 ký tự')
      .test(
        'custom rule',
        'Vui lòng nhập ít nhất 1 ký tự là số',
        (value?: string) => {
          const regex = /\d/;
          const isExistNumber = !!value && regex.test(value);
          return isExistNumber;
        },
      )
      .test(
        'custom rule',
        'Vui lòng nhập ít nhất 1 ký tự đặc biệt',
        (value?: string) => {
          const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          const isExistSpecialCharacter = !!value && regex.test(value);
          return isExistSpecialCharacter;
        },
      ),
    newPassword: yup
      .string()
      .notRequired()
      .test('custom rule', 'Vui lòng nhập ít nhất 8 ký tự', (value?: any) => {
        const validField = value.length === 0 || value.length >= 8;
        return validField;
      })

      .max(256, 'Trường này chỉ nhập tối đa 256 ký tự')
      .test(
        'custom rule',
        'Vui lòng nhập ít nhất 1 ký tự là số',
        (value?: string) => {
          const regex = /\d/;
          const isExistNumber = !!value && regex.test(value);

          const validField = value?.length === 0 || isExistNumber;
          return validField;
        },
      )
      .test(
        'custom rule',
        'Vui lòng nhập ít nhất 1 ký tự đặc biệt',
        (value?: string) => {
          const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          const isExistSpecialCharacter = !!value && regex.test(value);

          const validField = value?.length === 0 || isExistSpecialCharacter;
          return validField;
        },
      )
      .test(
        'custom rule',
        'Vui lòng nhập mật khẩu mới khác mật khẩu hiện tại',
        (value?: string) => {
          const { password: passwordInput } = getValues();
          const isValid = value !== passwordInput;
          return isValid;
        },
      ),
    retypeNewPassword: yup
      .string()
      .notRequired()
      .oneOf(
        [yup.ref('newPassword')],
        'Vui lòng nhập lại mật khẩu mới chính xác',
      ),
  });

  const accountProfileInfo = {
    name: profileInfo.name,
    email: profileInfo.email,
    password: '',
    newPassword: '',
    retypeNewPassword: '',
  };

  const form = useForm({
    mode: 'all',
    // defaultValues: {
    //   name: profileInfo.name,
    //   email: profileInfo.email,
    //   password: '',
    //   newPassword: '',
    //   retypeNewPassword: '',
    // },
    defaultValues: useMemo(() => {
      return accountProfileInfo;
    }, [profileInfo]),
    resolver: yupResolver(schema),
  });
  const { reset } = form;
  useEffect(() => {
    reset(accountProfileInfo);
  }, [profileInfo]);

  const { formState, getValues } = form;
  const { isDirty } = formState;

  const handleSubmit = (valuesForm: any) => {
    if (valuesForm) {
      // Delete field retypeNewPassword and newPassword (if new password not exist)
      delete valuesForm.retypeNewPassword;
      if (valuesForm.newPassword.length === 0) {
        delete valuesForm.newPassword;
      }

      handleUserInfo(valuesForm);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="password" />
        <h6 className={styles.typeTitle}>Thông tin tài khoản 222</h6>
        <InputField form={form} name="name" />
        <InputField form={form} name="email" />
        <InputField form={form} name="newPassword" />
        <InputField form={form} name="retypeNewPassword" />

        <div className={styles.submitBtnContainer}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!isDirty}
          >
            Thay đổi thông tin
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
