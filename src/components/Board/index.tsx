import * as React from 'react';
import {
  Grid
} from '@material-ui/core';

import MatchCard, { MatchCardProps } from '../MatchCard';

type BoardProps = {
  cards: Array<MatchCardProps>
};

type BoardState = {
  selectedCardFirst?: MatchCardProps | null,
  selectedCardSecond?: MatchCardProps | null
} & BoardProps;

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      ...props,
      selectedCardFirst: null,
      selectedCardSecond: null,
    };

    this.selectMatchCard = this.selectMatchCard.bind(this);
  }

  selectMatchCard = (card: MatchCardProps) => {
    const {
      selectedCardFirst,
      selectedCardSecond
    } = this.state;

    if (selectedCardFirst === null
      || selectedCardSecond === null
      || (selectedCardSecond && selectedCardSecond.id !== card.id)
    ) {
      this.setState({
        selectedCardFirst:
          (selectedCardFirst && selectedCardFirst.id === card.id)
            ? null
            : (selectedCardFirst === null)
              ? card
              : (selectedCardFirst && selectedCardSecond && selectedCardSecond.id !== card.id)
                ? card
                : selectedCardFirst
      });
    }

    if (selectedCardFirst && selectedCardFirst.id !== card.id) {
      this.setState({
        selectedCardSecond: (selectedCardSecond && selectedCardSecond.id === card.id)
          ? null
          : (selectedCardFirst && selectedCardSecond && selectedCardFirst.id && selectedCardSecond.id)
            ? null
            : (selectedCardFirst && selectedCardFirst.id)
              ? card
              : (selectedCardFirst && selectedCardFirst.id !== card.id)
                ? selectedCardSecond
                : null
      });
    }
  }

  render() {
    const { cards, selectedCardFirst, selectedCardSecond } = this.state;

    return (<Grid container spacing={3}>
      {cards
        .sort((a, b) => a.order - b.order)
        .map(card => (
        <Grid item xs={6} sm={3} key={card.id}>
          <MatchCard {... {
              ...card,
              selected: selectedCardFirst === card || selectedCardSecond === card
            }}
            onClick={() => this.selectMatchCard(card)}
          />
          {/* {console.log('selectedCardFirst: ', selectedCardFirst)}
          {console.log('selectedCardSecond: ', selectedCardSecond)} */}
        </Grid>
      ))}
    </Grid>);
  }
}

export default Board;