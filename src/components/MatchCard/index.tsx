import * as React from 'react';

import { Card, CardMedia, Container } from '@material-ui/core';

export type MatchCardProps = {
  id: string,
  title: string,
  order: number,
  selected?: boolean,
  imgSrc?: string,
  onClick?: any
};

type MatchCardState = {
  backImgSrc?: string
};

class MatchCard extends React.Component<MatchCardProps, MatchCardState> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...props,
      backImgSrc: 'https://images.techhive.com/images/article/2014/04/geometric-seamless-pattern-123822240-100264965-large3x2.jpg'
    };
  }

  render() {
    const {
      backImgSrc
    } = this.state;

    const {
      onClick,
      selected,
      imgSrc
    } = this.props;

    return (
      <Container className='match-card-container'>
        <Card className={`match-card ${selected ? 'selected' : ''}`} {... { onClick }}>
          {selected
          ? <CardMedia
            className='back'
            image={imgSrc}
          />
          : <CardMedia
            className='front'
            image={backImgSrc}
          />}
        </Card>
      </Container>
    );
  }
}

export default MatchCard;