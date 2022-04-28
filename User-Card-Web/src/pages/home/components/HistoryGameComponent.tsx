import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space } from 'antd';

HistoryGameComponent.propTypes = {};

const columns: any[] = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Winner Name',
    dataIndex: 'winnerName',
    key: 'winnerName',
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
];

interface IMyProps {
  data?: any;
}

function HistoryGameComponent(props: IMyProps) {
  const { data: gamesList } = props;

  const [data, setData] = useState([]);
  useEffect(() => {
    const gameRenderList = gamesList?.map((each: any, index: number) => {
      let playerHandName = each.playerHand.cards.map((x: any) => x.name);
      playerHandName = playerHandName.join(', ');

      let playerHandRank = each.playerHand.cards.reduce(
        (accom: any, x: any) => {
          let dataRank = x.rank;
          if (dataRank === 11 || dataRank === 12 || dataRank === 13) {
            dataRank = 10;
          }
          if (dataRank === 14) {
            dataRank = 1;
          }
          return accom + dataRank;
        },
        0,
      );
      playerHandRank = playerHandRank % 10;

      let botHandName = each.botHand.cards.map((x: any) => x.name);
      botHandName = botHandName.join(', ');

      let botHandRank = each.botHand.cards.reduce((accom: any, x: any) => {
        let dataRank = x.rank;
        if (dataRank === 11 || dataRank === 12 || dataRank === 13) {
          dataRank = 10;
        }
        if (dataRank === 14) {
          dataRank = 1;
        }
        return accom + dataRank;
      }, 0);
      botHandRank = botHandRank % 10;

      return {
        ...each,
        playerHandName,
        playerHandRank,
        botHandName,
        botHandRank,
        key: index + 1,
      };
    });

    setData(gameRenderList);
  }, [gamesList]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        hideOnSinglePage: true,
      }}
      // scroll={{ x: 1300 }}
    />
  );
}

export default HistoryGameComponent;
