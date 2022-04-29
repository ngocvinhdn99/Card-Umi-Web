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
  loading: any;
}

function UpdatedForm(props: IMyProps) {
  const { updatedData, handleUpdate, loading } = props;

  const schema = yup.object().shape({
    id: yup.string().min(1, 'Vui lòng nhập id'),
    key: yup.string().min(1, 'Vui lòng nhập key'),
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
    point: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập point hơn 1')
      .max(10000, 'Vui lòng nhập point nhỏ hơn 10,000'),
    totalGame: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(0, 'Vui lòng nhập totalGame hơn 0'),
    winGame: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(0, 'Vui lòng nhập winGame hơn 0'),
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

  const handleSubmit = async (valuesForm: any) => {
    if (valuesForm) {
      await handleUpdate(valuesForm);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="id" />
        <InputField form={form} name="key" />
        <InputField form={form} name="name" />
        <InputField form={form} name="email" />
        <InputField form={form} name="totalGame" />
        <InputField form={form} name="point" />
        <InputField form={form} name="winGame" />
        <InputField form={form} name="winRate" />
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitBtn}
          loading={loading.effects['profile/handleUpdate']}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdatedForm;
