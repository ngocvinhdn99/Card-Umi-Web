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

  return (
    <div>
      <label htmlFor="" className="label">
        {name}
      </label>
      <Controller name={name} control={form.control} as={Input} />
      {hasError && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}

export default InputField;
