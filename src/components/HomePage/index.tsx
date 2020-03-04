import * as React from 'react';
import {
  Grid, Typography
} from '@material-ui/core';

import Board from '../Board';
import { MatchCardProps } from '../MatchCard';

import woody from '../../assets/images/woody.jpg';
import buzz from '../../assets/images/buzz-lightyear.jpg';
import boPeep from '../../assets/images/bo-peep.jpg';
import forky from '../../assets/images/forky.jpg';

const cards: Array<MatchCardProps> = [{
    id: '1',
    title: 'Woody',
    order: Math.floor(Math.random() * 4),
    imgSrc: woody
  },
  {
    id: '2',
    title: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 4),
    imgSrc: buzz
  },
  {
    id: '3',
    title: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 4),
    imgSrc: boPeep
  },
  {
    id: '4',
    title: 'Forky',
    order: Math.floor(Math.random() * 4),
    imgSrc: forky
  },
  {
    id: '5',
    title: 'Woody',
    order: Math.floor(Math.random() * 4),
    imgSrc: woody
  },
  {
    id: '6',
    title: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 4),
    imgSrc: buzz
  },
  {
    id: '7',
    title: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 4),
    imgSrc: boPeep
  },
  {
    id: '8',
    title: 'Forky',
    order: Math.floor(Math.random() * 4),
    imgSrc: forky
  }
];

class HomePage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <Grid>
        <Grid item xs={12}>
          <Typography variant='h2'>Matching Game</Typography>
        </Grid>
        <Grid item xs={12}>
          <Board {... {cards}}></Board>
        </Grid>
      </Grid>
    );
  }
}

export default HomePage;
