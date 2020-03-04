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
    value: 'Woody',
    order: Math.floor(Math.random() * 4),
    imgSrc: woody,
    selected: false
  },
  {
    id: '2',
    value: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 4),
    imgSrc: buzz,
    selected: false
  },
  {
    id: '3',
    value: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 4),
    imgSrc: boPeep,
    selected: false
  },
  {
    id: '4',
    value: 'Forky',
    order: Math.floor(Math.random() * 4),
    imgSrc: forky,
    selected: false
  },
  {
    id: '5',
    value: 'Woody',
    order: Math.floor(Math.random() * 4),
    imgSrc: woody,
    selected: false
  },
  {
    id: '6',
    value: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 4),
    imgSrc: buzz,
    selected: false
  },
  {
    id: '7',
    value: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 4),
    imgSrc: boPeep,
    selected: false
  },
  {
    id: '8',
    value: 'Forky',
    order: Math.floor(Math.random() * 4),
    imgSrc: forky,
    selected: false
  }
];

class HomePage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <Grid>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
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
