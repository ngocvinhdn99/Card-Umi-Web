import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import 'antd/dist/antd.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';
import styles from '../index.less';

BotsCreatedForm.propTypes = {};

interface IMyProps {
  handleCreate: any;
}

function BotsCreatedForm(props: IMyProps) {
  const { handleCreate } = props;

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Vui lòng nhập thông tin của trường này')
      .min(1, 'Vui lòng nhập thông tin của trường này')
      .max(256, 'Trường này chỉ nhập được tối đa 256 ký tự'),
    totalPoints: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .required('Vui lòng nhập thông tin của trường này')
      .min(1, 'Vui lòng nhập số lớn hơn hoặc bằng 1')
      .max(10000, 'Trường này chỉ nhập tối đa con số 10,000'),
    minBet: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .required('Vui lòng nhập thông tin của trường này')
      .min(1, 'Vui lòng nhập số lớn hơn hoặc bằng 1')
      .max(10000, 'Trường này chỉ nhập tối đa con số 10,000'),
    maxBet: yup
      .number()
      .typeError('Vui lòng nhập kiểu dữ liệu là số')
      .required('Vui lòng nhập thông tin của trường này')
      .min(1, 'Vui lòng nhập số lớn hơn hoặc bằng 1')
      .max(10000, 'Trường này chỉ nhập tối đa con số 10,000'),
  });

  const form = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      totalPoints: '',
      minBet: '',
      maxBet: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (valuesForm: any) => {
    if (valuesForm) {
      handleCreate(valuesForm);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="name" />
        <InputField form={form} name="totalPoints" />
        <InputField form={form} name="minBet" />
        <InputField form={form} name="maxBet" />
        <Button type="primary" htmlType="submit" className={styles.submitBtn}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default BotsCreatedForm;
