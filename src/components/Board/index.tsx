import * as React from 'react';
import {
  Grid
} from '@material-ui/core';

import MatchCard, { MatchCardProps } from '../MatchCard';

type BoardProps = {
  cards: Array<MatchCardProps>
};

type BoardState = {
  selectedCard?: string
} & BoardProps;

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      ...props,
      selectedCard: ''
    };

    this.selectMatchCard = this.selectMatchCard.bind(this);
  }

  selectMatchCard = (card: MatchCardProps) => {
    const { selectedCard } = this.state;

    this.setState({
      selectedCard: (selectedCard && selectedCard === card.id)
        ? ''
        : card.id
    });
  }

  render() {
    const { cards, selectedCard } = this.state;

    return (<Grid container spacing={3}>
      {cards
        .sort((a, b) => a.order - b.order)
        .map(card => (
        <Grid item xs={6} sm={3} key={card.id}>
          <MatchCard {... {
              ...card,
              selected: selectedCard === card.id
            }}
            onClick={() => this.selectMatchCard(card)}
          />
        </Grid>
      ))}
    </Grid>);
  }
}

export default Board;