import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styles from '../index.less';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';

RegisterForm.propTypes = {};

function RegisterForm(props: any) {
  const schema = yup.object().shape({
    name: yup.string().min(1, 'Vui lòng nhập tên người dùng'),
    email: yup
      .string()
      .email('Vui lòng nhập email hợp lệ')
      .min(1, 'Vui lòng nhập email'),
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
    console.log(valuesForm);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="name" />
        <InputField form={form} name="email" />
        <InputField form={form} name="password" />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </form>
    </div>
  );
}

export default RegisterForm;
