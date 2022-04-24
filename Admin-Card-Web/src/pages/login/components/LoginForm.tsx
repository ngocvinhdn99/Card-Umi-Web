import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styles from '../index.less';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';

LoginForm.propTypes = {};
interface IMyProps {
  handleAdminInfo: Function;
  isLoading: boolean;
}

function LoginForm(props: IMyProps) {
  const { handleAdminInfo, isLoading } = props;

  const schema = yup.object().shape({
    username: yup.string().min(1, 'Vui lòng nhập email'),
    password: yup
      .string()
      .min(5, 'Vui lòng nhập ít nhất 5 ký tự')
      .max(256, 'Trường này chỉ nhập tối đa 256 ký tự'),
  });

  const form = useForm({
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (valuesForm: any) => {
    if (valuesForm) {
      handleAdminInfo(valuesForm);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="username" />
        <InputField form={form} name="password" />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </form>
    </div>
  );
}

export default LoginForm;
