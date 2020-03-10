import * as React from 'react';

import { Card, CardMedia, Container } from '@material-ui/core';

import cardBackground from '../../assets/images/card-background.jpg';

export type MatchCardProps = {
  id: number,
  value: string,
  order: number,
  selected?: boolean,
  matched?: boolean,
  imgSrc?: string,
  classes?: string,
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
      backImgSrc: cardBackground
    };
  }

  render() {
    const {
      classes,
      onClick,
      selected,
      matched,
      imgSrc
    } = this.props;

    const {
      backImgSrc
    } = this.state;

    return (
      <Container className='match-card-container'>
        <Card className={
          `match-card ${classes} ${selected ? 'selected' : ''} ${matched ? 'matched' : ''}`
          }
          {... {
            onClick
          }}
        >
          {selected || matched
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