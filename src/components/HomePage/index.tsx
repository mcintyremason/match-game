import * as React from 'react';

import Board from '../Board';
import { MatchCardType } from '../MatchCard';

const cards: Array<MatchCardType> = [{
    id: '1',
    value: 'A',
    order: Math.floor(Math.random() * 4)
  },
  {
    id: '2',
    value: 'B',
    order: Math.floor(Math.random() * 4)
  },
  {
    id: '3',
    value: 'C',
    order: Math.floor(Math.random() * 4)
  },
  {
    id: '4',
    value: 'D',
    order: Math.floor(Math.random() * 4)
  },
  {
    id: '5',
    value: 'A',
    order: Math.floor(Math.random() * 4)
  },
  {
    id: '6',
    value: 'B',
    order: Math.floor(Math.random() * 4)
  },
  {
    id: '7',
    value: 'C',
    order: Math.floor(Math.random() * 4)
  },
  {
    id: '8',
    value: 'D',
    order: Math.floor(Math.random() * 4)
  }
];

class HomePage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <Board {... {cards}}></Board>
    );
  }
}

export default HomePage;
