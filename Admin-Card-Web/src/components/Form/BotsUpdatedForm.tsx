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
    id: yup.string().min(1, 'Vui lòng nhập id'),
    key: yup.string().min(1, 'Vui lòng nhập key'),
    name: yup.string().min(8, 'Vui lòng nhập tên hơn 8 ký tự'),
    totalPoints: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập số lớn hơn 1'),
    remainPoints: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập số lớn hơn 1'),
    minBet: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập số lớn hơn 1'),
    maxBet: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .min(1, 'Vui lòng nhập số lớn hơn 1'),
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
        <InputField form={form} name="id" />
        <InputField form={form} name="key" />
        <InputField form={form} name="name" />
        <InputField form={form} name="totalPoints" />
        <InputField form={form} name="remainPoints" />
        <InputField form={form} name="minBet" />
        <InputField form={form} name="maxBet" />
        <Button type="primary" htmlType="submit" className={styles.submitBtn}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdatedForm;
