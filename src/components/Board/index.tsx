import * as React from 'react';
import {
  Button, Grid, Typography
} from '@material-ui/core';

import MatchCard, { MatchCardProps } from '../MatchCard';

type BoardProps = {
  cards: Array<MatchCardProps>
};

type BoardState = {
  selectedCardFirst?: MatchCardProps | null,
  selectedCardSecond?: MatchCardProps | null,
  matchedCards: Array<string>,
  gameRunning: boolean,
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
      gameOver: false,
      gameRunning: false
    };

    this.selectMatchCard = this.selectMatchCard.bind(this);
    this.startGame = this.startGame.bind(this);
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
    } else if (selectedCardFirst && selectedCardFirst.value !== card.value) {
      setTimeout(() => {
        const {
          selectedCardFirst,
          selectedCardSecond,
        } = this.state;

        if (selectedCardFirst && selectedCardSecond && selectedCardFirst.value !== selectedCardSecond.value) {
          this.setState({
            selectedCardFirst: null,
            selectedCardSecond: null
          });
        }
      }, 1500);
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

  startGame = () => {
    this.setState({
      gameRunning: true
    });
  }

  render() {
    const {
      cards,
      selectedCardFirst,
      selectedCardSecond,
      matchedCards,
      gameRunning,
      gameOver
    } = this.state;

    return (gameRunning
      ? (gameOver
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
        </Grid>)
        : <Grid
          className='menu'
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Button
            color='primary'
            variant='contained'
            value='START'
            onClick={this.startGame}
          >
             <Typography>START</Typography>
          </Button>
        </Grid>);
  }
}

export default Board;