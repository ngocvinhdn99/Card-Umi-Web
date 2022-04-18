import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space } from 'antd';

BotTableComponent.propTypes = {};

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
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function BotTableComponent(props: any) {
  const [pagination, setPagination] = useState({
    page: 1,
    total: 24,
    limit: 10,
  });

  const data = [
    {
      key: '1',
      name: 'Bot Lynked 01',
      totalPoints: 1000,
      remainPoints: 999,
    },
    {
      key: '2',
      name: 'Bot Lynked 02',
      totalPoints: 2000,
      remainPoints: 1999,
    },
    {
      key: '3',
      name: 'Bot Lynked 03',
      totalPoints: 3000,
      remainPoints: 2999,
    },
    {
      key: '4',
      name: 'Bot Lynked 04',
      totalPoints: 4000,
      remainPoints: 3999,
    },
    {
      key: '5',
      name: 'Bot Lynked 05',
      totalPoints: 5000,
      remainPoints: 4999,
    },
    {
      key: '6',
      name: 'Bot Lynked 06',
      totalPoints: 6000,
      remainPoints: 5999,
    },
    {
      key: '7',
      name: 'Bot Lynked 07',
      totalPoints: 7000,
      remainPoints: 6999,
    },
    {
      key: '8',
      name: 'Bot Lynked 08',
      totalPoints: 8000,
      remainPoints: 7999,
    },
    {
      key: '9',
      name: 'Bot Lynked 09',
      totalPoints: 9000,
      remainPoints: 8999,
    },
    {
      key: '10',
      name: 'Bot Lynked 010',
      totalPoints: 10000,
      remainPoints: 9999,
    },
    {
      key: '11',
      name: 'Bot Lynked 011',
      totalPoints: 11000,
      remainPoints: 10999,
    },
    {
      key: '12',
      name: 'Bot Lynked 012',
      totalPoints: 12000,
      remainPoints: 11999,
    },
  ];

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

  return (
    <Table columns={columns} dataSource={data} pagination={paginationTable} />
  );
}

export default BotTableComponent;
