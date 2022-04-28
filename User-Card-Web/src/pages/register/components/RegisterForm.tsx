import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import 'antd/dist/antd.css';
import styles from '../index.less';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';

RegisterForm.propTypes = {};
interface IMyProps {
  handleUserInfo: Function;
  isLoading: boolean;
}

function RegisterForm(props: IMyProps) {
  const { handleUserInfo, isLoading } = props;
  const schema = yup.object().shape({
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
      .required('Vui lòng nhập thông tin của trường này')
      .min(6, 'Vui lòng nhập ít nhất 6 ký tự')
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
  });

  const form = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (valuesForm: any) => {
    if (valuesForm) {
      handleUserInfo(valuesForm);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="name" />
        <InputField form={form} name="email" />
        <InputField form={form} name="password" />

        <div className={styles.submitBtnContainer}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
