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
  isLoadingUpdateProfile: boolean;
}

function UpdatedForm(props: IMyProps) {
  const { updatedData, handleUpdate, isLoadingUpdateProfile } = props;

  const schema = yup.object().shape({
    id: yup.string().min(1, 'Vui lòng nhập id'),
    key: yup.string().min(1, 'Vui lòng nhập key'),
    name: yup.string().min(8, 'Vui lòng nhập tên hơn 8 ký tự'),
    email: yup
      .string()
      .email('Vui lòng nhập email hợp lệ')
      .min(1, 'Vui lòng nhập email'),
    point: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(0, 'Vui lòng nhập point hơn 0'),
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
          loading={isLoadingUpdateProfile}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdatedForm;
