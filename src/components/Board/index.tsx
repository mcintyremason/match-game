import * as React from 'react';
import {
  Grid, Typography
} from '@material-ui/core';

import MatchCard, { MatchCardProps } from '../MatchCard';

type BoardProps = {
  cards: Array<MatchCardProps>
};

type BoardState = {
  selectedCardFirst?: MatchCardProps | null,
  selectedCardSecond?: MatchCardProps | null,
  matchedCards: Array<string>,
  gameOver: boolean
} & BoardProps;

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      ...props,
      selectedCardFirst: null,
      selectedCardSecond: null,
      matchedCards: [],
      gameOver: false
    };

    this.selectMatchCard = this.selectMatchCard.bind(this);
  }

  checkForMatch = ({ card }: { card: MatchCardProps }) => {
    const {
      cards,
      selectedCardFirst,
      matchedCards
    } = this.state;

    if (selectedCardFirst && selectedCardFirst.value === card.value) {
      matchedCards.push(card.value);

      this.setState({
        selectedCardFirst: null,
        selectedCardSecond: null,
        gameOver: (matchedCards.length === (cards.length / 2))
      });
    }
  }

  selectMatchCard = ({ card }: { card: MatchCardProps }) => {
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

      this.checkForMatch({ card });
    }
  }

  render() {
    const {
      cards,
      selectedCardFirst,
      selectedCardSecond,
      matchedCards,
      gameOver
    } = this.state;

    return (gameOver
      ? (<Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Typography variant='h1'>You Win!</Typography>
      </Grid>)
      : <Grid container spacing={3}>
        {cards
        .sort((a, b) => a.order - b.order)
        .map(card => (
        <Grid item xs={6} sm={3} key={card.id}>
          <MatchCard {... {
              ...card,
              selected: selectedCardFirst === card || selectedCardSecond === card,
              matched: matchedCards.find(x => x === card.value) ? true : false
            }}
            onClick={() => this.selectMatchCard({ card })}
          />
        </Grid>))}
      </Grid>);
  }
}

export default Board;