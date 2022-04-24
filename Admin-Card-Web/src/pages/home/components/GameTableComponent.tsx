import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space } from 'antd';

GameTableComponent.propTypes = {};

const columns: any[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <a> {text}</a>,
    fixed: 'left',
  },
  {
    title: 'Player Id',
    dataIndex: 'playerID',
    key: 'playerId',
  },
  {
    title: 'Bot Id',
    dataIndex: 'botID',
    key: 'botId',
  },
  {
    title: 'Winner Id',
    dataIndex: 'winnerID',
    key: 'winnerId',
  },
  {
    title: 'Player Hand',
    children: [
      {
        title: 'Player Hand Name',
        dataIndex: 'playerHandName',
        key: 'playerHandName',
        fixed: 'right',
      },
      {
        title: 'Player Hand Rank',
        dataIndex: 'playerHandRank',
        key: 'playerHandRank',
        fixed: 'right',
      },
    ],
  },
  {
    title: 'Bot Hand',
    children: [
      {
        title: 'Bot Hand Name',
        dataIndex: 'botHandName',
        key: 'botHandName',
        fixed: 'right',
      },
      {
        title: 'Bot Hand Rank',
        dataIndex: 'botHandRank',
        key: 'botHandRank',
        fixed: 'right',
      },
    ],
  },
  {
    title: 'Bet Value',
    dataIndex: 'betValue',
    key: 'betValue',
    fixed: 'right',
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',

    render: (text: string, record: any) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

interface IMyProps {
  gameList: any;
  paginationModel: any;
}

function GameTableComponent(props: IMyProps) {
  const { gameList, paginationModel } = props;
  const [pagination, setPagination] = useState({
    page: 1,
    total: 24,
    limit: 10,
  });

  // const data = [
  //   {
  //     key: '1',
  //     gameNo: '1',
  //     playerId: 'Vinh 01',
  //     botId: 'Bot 01',
  //     winnerId: 'Vinh 01',
  //     playerHandName: '3',
  //     playerHandRank: 3,
  //     botHandName: '3',
  //     botHandRank: 3,
  //     betValue: 30,
  //   },
  //   {
  //     key: '2',
  //     gameNo: '2',
  //     playerId: 'Vinh 02',
  //     botId: 'Bot 02',
  //     winnerId: 'Vinh 02',
  //     playerHandName: '4',
  //     playerHandRank: 4,
  //     botHandName: '4',
  //     botHandRank: 4,
  //     betValue: 40,
  //   },
  //   {
  //     key: '3',
  //     gameNo: '3',
  //     playerId: 'Vinh 03',
  //     botId: 'Bot 03',
  //     winnerId: 'Vinh 03',
  //     playerHandName: '5',
  //     playerHandRank: 5,
  //     botHandName: '5',
  //     botHandRank: 5,
  //     betValue: 50,
  //   },
  //   {
  //     key: '4',
  //     gameNo: '4',
  //     playerId: 'Vinh 04',
  //     botId: 'Bot 04',
  //     winnerId: 'Vinh 04',
  //     playerHandName: '6',
  //     playerHandRank: 6,
  //     botHandName: '6',
  //     botHandRank: 6,
  //     betValue: 60,
  //   },
  //   {
  //     key: '5',
  //     gameNo: '5',
  //     playerId: 'Vinh 05',
  //     botId: 'Bot 05',
  //     winnerId: 'Vinh 05',
  //     playerHandName: '7',
  //     playerHandRank: 7,
  //     botHandName: '7',
  //     botHandRank: 7,
  //     betValue: 70,
  //   },
  //   {
  //     key: '6',
  //     gameNo: '6',
  //     playerId: 'Vinh 06',
  //     botId: 'Bot 06',
  //     winnerId: 'Vinh 06',
  //     playerHandName: '8',
  //     playerHandRank: 8,
  //     botHandName: '8',
  //     botHandRank: 8,
  //     betValue: 80,
  //   },
  //   {
  //     key: '7',
  //     gameNo: '7',
  //     playerId: 'Vinh 07',
  //     botId: 'Bot 07',
  //     winnerId: 'Vinh 07',
  //     playerHandName: '9',
  //     playerHandRank: 9,
  //     botHandName: '9',
  //     botHandRank: 9,
  //     betValue: 90,
  //   },
  //   {
  //     key: '8',
  //     gameNo: '8',
  //     playerId: 'Vinh 08',
  //     botId: 'Bot 08',
  //     winnerId: 'Vinh 08',
  //     playerHandName: '10',
  //     playerHandRank: 10,
  //     botHandName: '10',
  //     botHandRank: 10,
  //     betValue: 100,
  //   },
  //   {
  //     key: '9',
  //     gameNo: '9',
  //     playerId: 'Vinh 09',
  //     botId: 'Bot 09',
  //     winnerId: 'Vinh 09',
  //     playerHandName: 'J',
  //     playerHandRank: 11,
  //     botHandName: 'J',
  //     botHandRank: 11,
  //     betValue: 110,
  //   },
  //   {
  //     key: '10',
  //     gameNo: '10',
  //     playerId: 'Vinh 010',
  //     botId: 'Bot 010',
  //     winnerId: 'Vinh 010',
  //     playerHandName: 'Q',
  //     playerHandRank: 12,
  //     botHandName: 'Q',
  //     botHandRank: 12,
  //     betValue: 120,
  //   },
  //   {
  //     key: '11',
  //     gameNo: '11',
  //     playerId: 'Vinh 011',
  //     botId: 'Bot 011',
  //     winnerId: 'Vinh 011',
  //     playerHandName: 'K',
  //     playerHandRank: 13,
  //     botHandName: 'K',
  //     botHandRank: 13,
  //     betValue: 130,
  //   },
  //   {
  //     key: '12',
  //     gameNo: '12',
  //     playerId: 'Vinh 012',
  //     botId: 'Bot 012',
  //     winnerId: 'Vinh 012',
  //     playerHandName: 'A',
  //     playerHandRank: 14,
  //     botHandName: 'A',
  //     botHandRank: 14,
  //     betValue: 140,
  //   },
  // ];

  const [data, setData] = useState([]);
  useEffect(() => {
    const gameRenderList = gameList?.map((each: any) => {
      let playerHandName = each.playerHand.cards.map((x: any) => x.name);
      playerHandName = playerHandName.join(', ');

      let playerHandRank = each.playerHand.cards.reduce(
        (accom: any, x: any) => accom + x.rank,
        0,
      );
      playerHandRank = playerHandRank % 10;

      let botHandName = each.botHand.cards.map((x: any) => x.name);
      botHandName = botHandName.join(', ');

      let botHandRank = each.botHand.cards.reduce(
        (accom: any, x: any) => accom + x.rank,
        0,
      );
      botHandRank = botHandRank % 10;

      return {
        ...each,
        playerHandName,
        playerHandRank,
        botHandName,
        botHandRank,
      };
    });

    setData(gameRenderList);
  }, [gameList]);

  const handlePageChange = (page: any, limit: any) => {
    const newPagination = {
      ...pagination,
      page,
      limit,
    };
    setPagination(newPagination);
  };

  const paginationTable = {
    current: pagination.page,
    // total: paginationModel.total,
    total: 77,
    onChange: handlePageChange,
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={paginationTable}
      scroll={{ x: 1300 }}
    />
  );
}

export default GameTableComponent;
