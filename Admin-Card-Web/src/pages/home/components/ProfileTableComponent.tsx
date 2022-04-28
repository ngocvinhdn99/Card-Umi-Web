import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Modal, Button } from 'antd';
import {
  ExclamationCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import ProfileUpdatedForm from '@/components/Form/ProfileUpdatedForm';
import styles from '../index.less';

ProfileTableComponent.propTypes = {};
const { confirm } = Modal;
interface IMyProps {
  profileList: any;
  handleProfileModelApi: Function;
  paginationModel: any;
  isLoadingUpdateProfile: boolean;
  handleGetAllApi: Function;
}

function ProfileTableComponent(props: IMyProps) {
  const {
    profileList,
    handleProfileModelApi,
    paginationModel,
    isLoadingUpdateProfile,
    handleGetAllApi,
  } = props;
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const dataResult = profileList.map((value: any, index: any) => ({
      ...value,
      key: index,
      winRate: `${(value.winRate * 100).toFixed(2)}%`,
    }));
    setData(dataResult);
  }, [profileList]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: 'Total Game',
      dataIndex: 'totalGame',
      key: 'totalGame',
    },
    {
      title: 'Win Game',
      dataIndex: 'winGame',
      key: 'winGame',
    },
    {
      title: 'Win Rate',
      dataIndex: 'winRate',
      key: 'winRate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => showModal(text, record)}>Update</a>
          <a onClick={() => showConfirm(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const [isUpdatedModalVisible, setIsUpdatedModalVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);

  const showModal = (text: string, record: any) => {
    setUpdatedData(record);
    setIsUpdatedModalVisible(true);
  };

  const handleCancel = (type: string) => {
    if (type === 'update') {
      setIsUpdatedModalVisible(false);
    }
  };

  const handleDefaultPagination = () => {
    const defaultPagination = {
      page: 1,
      limit: 10,
    };
    setPagination(defaultPagination);
  };

  const handleDelete = (data: any) => {
    handleProfileModelApi('delete', data);
    handleDefaultPagination();
  };

  const showConfirm = (record: any) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        handleDelete(record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handlePageChange = (page: any, limit: any) => {
    const newPagination = {
      ...pagination,
      page,
      limit,
    };
    setPagination(newPagination);
  };

  useEffect(() => {
    handleGetAllApi('profile', pagination);
  }, [pagination]);

  const paginationTable = {
    current: pagination.page,
    total: paginationModel?.total,
    onChange: handlePageChange,
  };

  const handleUpdate = async (newUpdateData: any) => {
    if (!newUpdateData) return;

    await handleProfileModelApi('update', newUpdateData);
    handleDefaultPagination();

    setIsUpdatedModalVisible(false);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={paginationTable} />
      <Modal
        title="Bot Update Form"
        visible={isUpdatedModalVisible}
        centered
        onOk={() => handleCancel('update')}
        onCancel={() => handleCancel('update')}
        footer={null}
      >
        {updatedData && (
          <ProfileUpdatedForm
            updatedData={updatedData}
            handleUpdate={handleUpdate}
            isLoadingUpdateProfile={isLoadingUpdateProfile}
          />
        )}
      </Modal>
    </div>
  );
}

export default ProfileTableComponent;
