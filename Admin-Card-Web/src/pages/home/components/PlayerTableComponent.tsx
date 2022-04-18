import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UpdatedForm from './UpdatedForm';

PlayerTableComponent.propTypes = {};
const { confirm } = Modal;

function PlayerTableComponent(props: any) {
  const [pagination, setPagination] = useState({
    page: 1,
    total: 24,
    limit: 10,
  });
  const [data, setData] = useState([
    {
      key: '1',
      name: 'Huynh Ngoc Vinh 01',
      email: 'vinh01@gmail.com',
      password: 'vinh01',
      point: 1,
      totalGame: 1,
      winGame: 1,
      winRate: '100%',
    },
    {
      key: '2',
      name: 'Huynh Ngoc Vinh 02',
      email: 'vinh02@gmail.com',
      password: 'vinh02',
      point: 2,
      totalGame: 2,
      winGame: 2,
      winRate: '200%',
    },
    {
      key: '3',
      name: 'Huynh Ngoc Vinh 03',
      email: 'vinh03@gmail.com',
      password: 'vinh03',
      point: 3,
      totalGame: 3,
      winGame: 3,
      winRate: '300%',
    },
    {
      key: '4',
      name: 'Huynh Ngoc Vinh 04',
      email: 'vinh04@gmail.com',
      password: 'vinh04',
      point: 4,
      totalGame: 4,
      winGame: 4,
      winRate: '400%',
    },
    {
      key: '5',
      name: 'Huynh Ngoc Vinh 05',
      email: 'vinh05@gmail.com',
      password: 'vinh05',
      point: 5,
      totalGame: 5,
      winGame: 5,
      winRate: '500%',
    },
    {
      key: '6',
      name: 'Huynh Ngoc Vinh 06',
      email: 'vinh06@gmail.com',
      password: 'vinh06',
      point: 6,
      totalGame: 6,
      winGame: 6,
      winRate: '600%',
    },
    {
      key: '7',
      name: 'Huynh Ngoc Vinh 07',
      email: 'vinh07@gmail.com',
      password: 'vinh07',
      point: 7,
      totalGame: 7,
      winGame: 7,
      winRate: '700%',
    },
    {
      key: '8',
      name: 'Huynh Ngoc Vinh 08',
      email: 'vinh08@gmail.com',
      password: 'vinh08',
      point: 8,
      totalGame: 8,
      winGame: 8,
      winRate: '800%',
    },
    {
      key: '9',
      name: 'Huynh Ngoc Vinh 09',
      email: 'vinh09@gmail.com',
      password: 'vinh09',
      point: 9,
      totalGame: 9,
      winGame: 9,
      winRate: '900%',
    },
    {
      key: '10',
      name: 'Huynh Ngoc Vinh 010',
      email: 'vinh010@gmail.com',
      password: 'vinh010',
      point: 10,
      totalGame: 10,
      winGame: 10,
      winRate: '1000%',
    },
    {
      key: '11',
      name: 'Huynh Ngoc Vinh 011',
      email: 'vinh011@gmail.com',
      password: 'vinh011',
      point: 11,
      totalGame: 11,
      winGame: 11,
      winRate: '1100%',
    },
    {
      key: '12',
      name: 'Huynh Ngoc Vinh 012',
      email: 'vinh012@gmail.com',
      password: 'vinh012',
      point: 12,
      totalGame: 12,
      winGame: 12,
      winRate: '1200%',
    },
  ]);

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
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
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
          <a onClick={() => showConfirm(text, record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);

  const showModal = (text: string, record: any) => {
    setUpdatedData(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (text: string, record: any) => {
    const deletedIndex = data.findIndex((value) => value === record);
    if (deletedIndex >= 0) {
      const newData = [...data];
      newData.splice(deletedIndex, 1);
      setData(newData);
    }
  };

  const showConfirm = (text: string, record: any) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        handleDelete(text, record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handlePageChange = (page: any, limit: any) => {
    console.log('page', page);
    console.log('limit', limit);

    const newPagination = {
      ...pagination,
      page,
      limit,
    };
    setPagination(newPagination);
  };

  const paginationTable = {
    current: pagination.page,
    total: pagination.total,
    onChange: handlePageChange,
  };

  const handleUpdate = (newUpdateData: any) => {
    if (!updatedData) return;
    const updatedIndex = data.findIndex((value) => value === updatedData);
    if (updatedIndex >= 0) {
      const newData = [...data];
      newData.splice(updatedIndex, 1, newUpdateData);
      setData(newData);
    }

    setIsModalVisible(false);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={paginationTable} />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {updatedData && (
          <UpdatedForm updatedData={updatedData} handleUpdate={handleUpdate} />
        )}
      </Modal>
    </div>
  );
}

export default PlayerTableComponent;
