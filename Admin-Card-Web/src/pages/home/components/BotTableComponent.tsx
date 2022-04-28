import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Modal, Button } from 'antd';
import {
  ExclamationCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import BotsUpdatedForm from '@/components/Form/BotsUpdatedForm';
import styles from '../index.less';
import BotsCreatedForm from '@/components/Form/BotsCreatedForm';

BotTableComponent.propTypes = {};
const { confirm } = Modal;
interface IMyProps {
  botList: any;
  handleBotsModelApi: Function;
  paginationModel: any;
  handleGetAllApi: Function;
}

function BotTableComponent(props: IMyProps) {
  const { botList, handleBotsModelApi, paginationModel, handleGetAllApi } =
    props;
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const dataResult = botList.map((value: any, index: any) => ({
      key: index,
      ...value,
    }));
    setData(dataResult);
  }, [botList]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'TotalPoints',
      dataIndex: 'totalPoints',
      key: 'totalPoints',
    },
    {
      title: 'RemainPoints',
      dataIndex: 'remainPoints',
      key: 'remainPoints',
    },
    {
      title: 'Min Bet',
      dataIndex: 'minBet',
      key: 'minBet',
    },
    {
      title: 'Max Bet',
      dataIndex: 'maxBet',
      key: 'maxBet',
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
  const [isCreatedModalVisible, setIsCreatedModelVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);

  const showModal = (text: string, record: any) => {
    setUpdatedData(record);
    setIsUpdatedModalVisible(true);
  };

  const handleOpenCreatedForm = () => {
    setIsCreatedModelVisible(true);
  };

  const handleCancel = (type: string) => {
    if (type === 'update') {
      setIsUpdatedModalVisible(false);
    }

    if (type === 'create') {
      setIsCreatedModelVisible(false);
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
    handleBotsModelApi('delete', data);
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
    handleGetAllApi('bots', pagination);
  }, [pagination]);

  const paginationTable = {
    current: pagination.page,
    total: paginationModel?.total,
    onChange: handlePageChange,
  };

  const handleUpdate = (newUpdateData: any) => {
    if (!newUpdateData) return;

    handleBotsModelApi('update', newUpdateData);
    handleDefaultPagination();

    setIsUpdatedModalVisible(false);
  };

  const handleCreate = (newData: any) => {
    if (!newData) return;
    handleBotsModelApi('create', newData);
    handleDefaultPagination();

    setIsCreatedModelVisible(false);
  };

  return (
    <div>
      <div className={styles.addBtnContainer}>
        <Button
          type="primary"
          shape="round"
          icon={<UsergroupAddOutlined />}
          size="large"
          onClick={handleOpenCreatedForm}
        >
          Create a bot
        </Button>
      </div>
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
          <BotsUpdatedForm
            updatedData={updatedData}
            handleUpdate={handleUpdate}
          />
        )}
      </Modal>

      <Modal
        title="Bot Creating Form"
        visible={isCreatedModalVisible}
        centered
        onOk={() => handleCancel('create')}
        onCancel={() => handleCancel('create')}
        footer={null}
      >
        <BotsCreatedForm handleCreate={handleCreate} />
      </Modal>
    </div>
  );
}

export default BotTableComponent;
