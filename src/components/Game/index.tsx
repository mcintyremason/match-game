import * as React from 'react';
import {
  Button, Grid, Typography
} from '@material-ui/core';

import MatchCard, { MatchCardProps } from '../MatchCard';

type GameProps = {
  cards: Array<MatchCardProps>
};

type GameState = {
  selectedCardFirst?: MatchCardProps | null,
  selectedCardSecond?: MatchCardProps | null,
  matchedCards: Array<string>,
  gameRunning: boolean,
  gameOver: boolean,
  resetCardsDelay: number,
  resetGameDelay: number,
  resetingCards: NodeJS.Timeout | number,
  winDelay: number
};

type GameType = GameProps & GameState;

const initState: GameState = {
  selectedCardFirst: null,
  selectedCardSecond: null,
  matchedCards: [],
  gameRunning: false,
  gameOver: false,
  resetCardsDelay: 1500,
  resetGameDelay: 3000,
  resetingCards: 0,
  winDelay: 1000
};

class Game extends React.Component<GameProps, GameType> {
  constructor(props: GameProps) {
    super(props);

    this.state = {
      ...props,
      ...initState
    };

    this.selectMatchCard = this.selectMatchCard.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  shuffleCards = (): GameProps => {
    const {
      cards
    } = this.props;

    return {
      cards: cards.map(( card ) => ({
        ...card,
        matched: false,
        order: Math.floor(Math.random() * 4)
      }))
    }
  }

  resetGame = (): boolean => {
    const {
      resetGameDelay
    } = this.state;

    setTimeout(() => {
      this.setState({
        ...this.shuffleCards(),
        ...initState,
        matchedCards: []
      });
    }, resetGameDelay);

    return true;
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
          gameOver: this.resetGame()
        });
      }, winDelay)
      : this.setState({
        selectedCardFirst: null,
        selectedCardSecond: null,
        gameOver: false
      });
  }

  autoResetCards = (): void => {
    const {
      resetingCards,
      resetCardsDelay
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
      }, resetCardsDelay)
    });
  }

  checkForMatch = ({ card }: { card: MatchCardProps }): MatchCardProps | null => {
    const {
      selectedCardFirst
    } = this.state;

    if (selectedCardFirst && selectedCardFirst.value === card.value) {
      this.checkForWin({ card });
    } else if (selectedCardFirst && selectedCardFirst.value !== card.value) {
      this.autoResetCards();
      return card;
    }

    return null;
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
              ? (selectedCardSecond && selectedCardSecond.id !== card.id)
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
            ? this.checkForMatch({ card })
            : (selectedCardFirst.value !== card.value)
              ? selectedCardSecond
              : null
      });
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

export default Game;