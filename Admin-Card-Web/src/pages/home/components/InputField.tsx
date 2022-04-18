import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Row, Col } from 'antd';
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
    <Row gutter={[16, 16]}>
      <Col span={5}>
        <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      </Col>
      <Col span={19}>
        <Controller
          name={name}
          control={form.control}
          as={Input}
          status={hasError ? 'error' : ''}
        />
        <span className={styles.error}>{errorMessage}</span>
      </Col>
    </Row>
  );
}

export default InputField;
