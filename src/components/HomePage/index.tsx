import * as React from 'react';
import {
  Grid, Typography
} from '@material-ui/core';

import Board from '../Board';
import { MatchCardProps } from '../MatchCard';

const cards: Array<MatchCardProps> = [{
    id: '1',
    title: 'Woody',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://www.demilked.com/magazine/wp-content/uploads/2019/07/5d2d78cba67fc-toy-story-4-amazing-details-pixar-disney-18-5d1c6987c1606__700.jpg'
  },
  {
    id: '2',
    title: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://2.bp.blogspot.com/-wqciEtwCvyw/XOzIhYeM9fI/AAAAAAAADT8/HjFjasP7J-MSsGYbc1QVMRIE-QyVFKSVgCKgBGAs/w0/toy-story-4-buzz-lightyear-uhdpaper.com-4K-7.jpg'
  },
  {
    id: '3',
    title: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://www.shrinktank.com/wp-content/uploads/2019/06/BoPeepFeatureImg.jpg'
  },
  {
    id: '4',
    title: 'Forky',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://insidethemagic-119e2.kxcdn.com/wp-content/uploads/2020/01/FORKY1.jpg'
  },
  {
    id: '5',
    title: 'Woody',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://www.demilked.com/magazine/wp-content/uploads/2019/07/5d2d78cba67fc-toy-story-4-amazing-details-pixar-disney-18-5d1c6987c1606__700.jpg'
  },
  {
    id: '6',
    title: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://2.bp.blogspot.com/-wqciEtwCvyw/XOzIhYeM9fI/AAAAAAAADT8/HjFjasP7J-MSsGYbc1QVMRIE-QyVFKSVgCKgBGAs/w0/toy-story-4-buzz-lightyear-uhdpaper.com-4K-7.jpg'
  },
  {
    id: '7',
    title: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://www.shrinktank.com/wp-content/uploads/2019/06/BoPeepFeatureImg.jpg'
  },
  {
    id: '8',
    title: 'Forky',
    order: Math.floor(Math.random() * 4),
    imgSrc: 'https://insidethemagic-119e2.kxcdn.com/wp-content/uploads/2020/01/FORKY1.jpg'
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
