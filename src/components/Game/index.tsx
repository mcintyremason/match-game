import React, { useContext, useState, useEffect } from 'react';

import {
  Button, Grid, Typography
} from '@material-ui/core';

import MatchCard, { MatchCardProps } from '../MatchCard';
import { GameContext } from '../HomePage';

type GameProps = {
  difficulty: number
  resetCardsDelay: number
  resetGameDelay: number
  winDelay: number
  // cards: Array<MatchCardProps>
};

const Game = (props: GameProps) => {
  const {
    difficulty,
    resetCardsDelay,
    resetGameDelay,
    winDelay
  } = props;
  // const [cards, setCards] = useState<Array<MatchCardProps>>(props.cards);
  const { cards, setCards } = useContext(GameContext);

  const [selectedCardFirst, setSelectedCardFirst] = useState<MatchCardProps | null>(null);
  const [selectedCardSecond, setSelectedCardSecond] = useState<MatchCardProps | null>(null);
  const [matchedCards, setMatchedCards] = useState<Array<String>>([]);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [resetingCards, setResetingCards] = useState<NodeJS.Timeout | number>(0);

  const startGame = () => {
    setGameRunning(true);
  };

  const shuffleCards = () => {
    setCards(cards.map(( card ) => ({
      ...card,
      matched: false,
      order: Math.floor(Math.random() * 4)
    })));
  }

  const resetGame = (): boolean => {
    setTimeout(() => {
      shuffleCards();
      setSelectedCardFirst(null);
      setSelectedCardSecond(null);
      setMatchedCards([]);
      setGameRunning(false);
      setGameOver(false);
      setResetingCards(0);
    }, resetGameDelay);
    return true;
  }

  const resetCards = () => {
    setSelectedCardFirst(null);
    setSelectedCardSecond(null);
    setGameOver(false);
  }


  const autoResetCards = (): void => {
    clearTimeout(resetingCards as number);
    setResetingCards(setTimeout(() => {
        if (
          selectedCardFirst
          && selectedCardSecond
          && selectedCardFirst.value !== selectedCardSecond.value
        ) {
          resetCards()
        }
      }, resetCardsDelay));
  }

  const checkForWin = ({ card }: { card: MatchCardProps }) => {
    matchedCards.push(card.value);

    (matchedCards.length === (cards.length / 2))
      ? setTimeout(() => {
        setSelectedCardFirst(null);
        setSelectedCardSecond(null);
        setGameOver(resetGame());
      }, winDelay)
      : resetCards();
  }

  const checkForMatch = ({ card }: { card: MatchCardProps }): MatchCardProps | null => {
    if (selectedCardFirst && selectedCardFirst.value === card.value) {
      console.log('3')
      checkForWin({ card });
      return card;
    } else if (selectedCardFirst && selectedCardFirst.value !== card.value) {
      autoResetCards();
      return card;
    }
    return null;
  };

  const selectMatchCard = ({ card }: { card: MatchCardProps }) => {
    if (selectedCardSecond === null
      || (selectedCardSecond && selectedCardSecond.id !== card.id)
    ) {
      setSelectedCardFirst(
          (selectedCardFirst && selectedCardFirst.id === card.id)
            ? null
            : (selectedCardFirst !== null)
              ? (selectedCardSecond && selectedCardSecond.id !== card.id)
                ? card
                : selectedCardFirst
              : card);
    }

    if (selectedCardFirst && selectedCardFirst.id !== card.id) {
      setSelectedCardSecond(
        (selectedCardSecond && selectedCardSecond.id === card.id)
        || (selectedCardFirst && selectedCardSecond)
          ? null
          : (selectedCardFirst && selectedCardFirst.id !== card.id)
            ? checkForMatch({ card })
            : (selectedCardFirst.value !== card.value)
              ? selectedCardSecond
              : null
      );
    }
  };

  useEffect(() => {
    console.log('hit')
  });

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
      : <div
        className={`${difficulty === 0 ? 'easy' : difficulty === 1 ? 'medium' : 'hard'}`}
      >
        <Grid container spacing={3}>
        {cards
        .sort((a, b) => a.order - b.order)
        .map(card =>
          (<Grid
            item
            xs={6}
            sm={difficulty === 0 ? 6 : difficulty === 1 ? 3 : 4}
            md={difficulty < 2 ? 3 : 2}
            key={card.id}
          >
            <MatchCard {... {
                ...card,
                classes: `${difficulty === 0 ? 'large' : difficulty === 1 ? 'medium' : 'small'}`,
                selected: selectedCardFirst === card || selectedCardSecond === card,
                matched: matchedCards.find(x => x === card.value) ? true : false
              }}
              onClick={() => selectMatchCard({ card })}
            />
          </Grid>))}
        </Grid>
      </div>)
      : <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Button
          color='primary'
          variant='contained'
          value='START'
          onClick={startGame}
        >
          <Typography>START</Typography>
        </Button>
      </Grid>);
}

export default Game;