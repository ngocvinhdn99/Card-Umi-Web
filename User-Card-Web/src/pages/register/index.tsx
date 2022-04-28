import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider, Image, Typography } from 'antd';
import 'antd/dist/antd.css';
import { homeImg } from '@/constants/index';
import RegisterFormComponent from './components/RegisterFormComponent';
import { history, Dispatch, AuthModelState, Loading } from 'umi';
import { connect } from 'dva';
import styles from './index.less';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  auth: AuthModelState;
}
const { Title } = Typography;

const RegisterComponent: React.FC<Props> = ({ auth, dispatch, loading }) => {
  const handleNavigate = () => {
    history.push('/login');
  };
  const isLoading = !!loading.effects['auth/register'];

  const handleUserInfo = (data: object) => {
    dispatch({
      type: 'auth/register',
      payload: data,
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={13}>
          <Image src={homeImg} preview={false} />
        </Col>
        <Col span={11}>
          <RegisterFormComponent
            handleUserInfo={handleUserInfo}
            isLoading={isLoading}
          />
          {/* <h6 onClick={handleNavigate}>
            Đã có có tài khoản rồi ? Đăng nhập ngay
          </h6> */}
          <Title
            level={5}
            onClick={handleNavigate}
            className={styles.navigateTitle}
          >
            Đã có có tài khoản rồi ? Đăng nhập ngay
          </Title>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ auth, loading }: any) => ({
  auth,
  loading,
}))(RegisterComponent);
