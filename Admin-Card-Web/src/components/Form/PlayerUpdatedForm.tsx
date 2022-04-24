import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import 'antd/dist/antd.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';
import styles from '../index.less';

UpdatedForm.propTypes = {};

interface IMyProps {
  updatedData: any;
  handleUpdate: any;
}

function UpdatedForm(props: IMyProps) {
  const { updatedData, handleUpdate } = props;

  const schema = yup.object().shape({
    key: yup.string().min(1, 'Vui lòng nhập key'),
    name: yup.string().min(8, 'Vui lòng nhập tên hơn 8 ký tự'),
    email: yup
      .string()
      .email('Vui lòng nhập email hợp lệ')
      .min(1, 'Vui lòng nhập email'),
    password: yup.string().min(4, 'Vui lòng nhập password hơn 4 ký tự'),
    totalGame: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập totalGame hơn 0'),
    point: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập point hơn 0'),
    winGame: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập winGame hơn 0'),
    winRate: yup.string().min(1, 'Vui lòng nhập Win Rate'),
  });

  const form = useForm({
    mode: 'all',
    defaultValues: useMemo(() => {
      return updatedData;
    }, [updatedData]),
    resolver: yupResolver(schema),
  });
  const { reset } = form;
  useEffect(() => {
    reset(updatedData);
  }, [updatedData]);

  const handleSubmit = (valuesForm: any) => {
    if (valuesForm) {
      handleUpdate(valuesForm);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="key" />
        <InputField form={form} name="name" />
        <InputField form={form} name="email" />
        <InputField form={form} name="password" />
        <InputField form={form} name="totalGame" />
        <InputField form={form} name="point" />
        <InputField form={form} name="winGame" />
        <InputField form={form} name="winRate" />
        <Button type="primary" htmlType="submit" className={styles.submitBtn}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdatedForm;
