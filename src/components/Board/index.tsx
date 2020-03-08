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
  gameOver: boolean,
  resetCardsTime: number,
  resetingCards: NodeJS.Timeout | number,
  winDelay: number
} & BoardProps;

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      ...props,
      selectedCardFirst: null,
      selectedCardSecond: null,
      matchedCards: [],
      gameRunning: false,
      gameOver: false,
      resetingCards: 0,
      resetCardsTime: 1500,
      winDelay: 1000
    };

    this.selectMatchCard = this.selectMatchCard.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  checkForWin = ({ card }: { card: MatchCardProps }) => {
    const {
      cards,
      matchedCards,
      winDelay
    } = this.state;

    matchedCards.push(card.value);

    (matchedCards.length === (cards.length / 2))
      ? setTimeout(() => {
        this.setState({
          selectedCardFirst: null,
          selectedCardSecond: null,
          gameOver: true
        });
      }, winDelay)
      : this.setState({
        selectedCardFirst: null,
        selectedCardSecond: null,
        gameOver: false
      });
  }

  checkForMatch = ({ card }: { card: MatchCardProps }) => {
    const {
      selectedCardFirst
    } = this.state;

    if (selectedCardFirst && selectedCardFirst.value === card.value) {
      this.checkForWin({ card });
    } else if (selectedCardFirst && selectedCardFirst.value !== card.value) {
      this.autoResetCards();
    }
  }

  autoResetCards = (): void => {
    const {
      resetingCards,
      resetCardsTime
    } = this.state;

    clearTimeout(resetingCards as number);

    this.setState({
      resetingCards: setTimeout(() => {
        const {
          selectedCardFirst,
          selectedCardSecond
        } = this.state;

        if (
          selectedCardFirst
          && selectedCardSecond
          && selectedCardFirst.value !== selectedCardSecond.value
        ) {
          this.setState({
            selectedCardFirst: null,
            selectedCardSecond: null
          });
        }
      }, resetCardsTime)
    });
  }

  selectMatchCard = ({ card }: { card: MatchCardProps }) => {
    const {
      selectedCardFirst,
      selectedCardSecond
    } = this.state;

    if (selectedCardSecond === null
      || (selectedCardSecond && selectedCardSecond.id !== card.id)
    ) {
      this.setState({
        selectedCardFirst:
          (selectedCardFirst && selectedCardFirst.id === card.id)
            ? null
            : (selectedCardFirst !== null)
              ? ((selectedCardFirst && selectedCardFirst.value === card.value)
                || (selectedCardSecond && selectedCardSecond.id !== card.id))
                ? card
                : selectedCardFirst
              : card
      });
    }

    if (selectedCardFirst && selectedCardFirst.id !== card.id) {
      this.setState({
        selectedCardSecond:
        (selectedCardSecond && selectedCardSecond.id === card.id)
        || (selectedCardFirst && selectedCardSecond)
          ? null
          : (selectedCardFirst && selectedCardFirst.id !== card.id)
            ? card
            : (selectedCardFirst.value !== card.value)
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