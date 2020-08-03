import React, { useContext, useState, useEffect } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'

import MatchCard, { MatchCardProps } from '../MatchCard'
import { GameContext } from '../HomePage'

type GameProps = {
  difficulty: number
  resetCardsDelay: number
  resetGameDelay: number
  winDelay: number
}

const Game = (props: GameProps) => {
  const { gameRunning, cards, setGameRunning, setCards } = useContext(
    GameContext
  )
  const { difficulty, resetCardsDelay, resetGameDelay, winDelay } = props
  const [
    selectedCardFirst,
    setSelectedCardFirst,
  ] = useState<MatchCardProps | null>(null)
  const [
    selectedCardSecond,
    setSelectedCardSecond,
  ] = useState<MatchCardProps | null>(null)
  const [matchedCards, setMatchedCards] = useState<Array<String>>([])
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [resetingCards, setResetingCards] = useState<NodeJS.Timeout | number>(0)

  const shuffleCards = () => {
    setCards(
      cards.map((card) => ({
        ...card,
        matched: false,
        order: Math.floor(Math.random() * 4),
      }))
    )
  }

  const resetGame = (): boolean => {
    setTimeout(() => {
      shuffleCards()
      setSelectedCardFirst(null)
      setSelectedCardSecond(null)
      setMatchedCards([])
      setGameRunning(false)
      setGameOver(false)
      setResetingCards(0)
    }, resetGameDelay)
    return true
  }

  const resetCards = () => {
    setSelectedCardFirst(null)
    setSelectedCardSecond(null)
    setGameOver(false)
  }

  const autoResetCards = (): void => {
    clearTimeout(resetingCards as number)
    setResetingCards(
      setTimeout(() => {
        if (
          selectedCardFirst &&
          selectedCardSecond &&
          selectedCardFirst.value !== selectedCardSecond.value
        ) {
          resetCards()
        }
      }, resetCardsDelay)
    )
  }

  const checkForWin = () => {
    matchedCards.length === cards.length / 2
      ? setTimeout(() => {
          setSelectedCardFirst(null)
          setSelectedCardSecond(null)
          setGameOver(resetGame())
        }, winDelay)
      : resetCards()
  }

  const checkForMatch = () => {
    if (
      selectedCardFirst &&
      selectedCardFirst.value === selectedCardSecond?.value
    ) {
      // if match add to list of matched cards & check for win
      setMatchedCards([...matchedCards, selectedCardSecond.value])
      return checkForWin()
    } else if (
      selectedCardFirst &&
      selectedCardFirst.value !== selectedCardSecond?.value
    ) {
      // else there's no match & the cards are flipped back over
      autoResetCards()
      return selectedCardSecond
    }
    return null
  }

  const isMatched = (card: MatchCardProps): boolean =>
    matchedCards.includes(card.value)

  const selectMatchCard = ({ card }: { card: MatchCardProps }) => {
    if (selectedCardFirst?.id === card.id) {
      // if first selected card is reselected
      // clear timeout before the cards auto reset
      clearTimeout(resetingCards as number)
      setSelectedCardFirst(selectedCardSecond)
      setSelectedCardSecond(null)
    } else if (selectedCardFirst === null && selectedCardSecond === null) {
      // if no cards are selected
      setSelectedCardFirst(card)
    } else if (selectedCardFirst && selectedCardSecond?.id === card.id) {
      // if first card is selected, and second card is reselected
      clearTimeout(resetingCards as number)
      setSelectedCardSecond(null)
    } else if (selectedCardFirst && selectedCardSecond === null) {
      // if first card is selected, and second card is not selected
      setSelectedCardSecond(card)
    } else if (
      selectedCardFirst &&
      selectedCardSecond &&
      selectedCardFirst.id !== card.id
    ) {
      // both cards are selected and a new first card is selected,
      // clear timeout before the cards auto reset
      clearTimeout(resetingCards as number)
      setSelectedCardFirst(card)
      setSelectedCardSecond(null)
    }
  }

  useEffect(() => {
    checkForMatch()
  }, [selectedCardSecond])

  useEffect(() => {
    checkForWin()
  }, [matchedCards])

  return gameRunning ? (
    gameOver ? (
      <Grid container direction='column' justify='center' alignItems='center'>
        <Typography variant='h1'>You Win!</Typography>
        <div class="pyro">
          <div class="before"></div>
          <div class="after"></div>
        </div>
      </Grid>
    ) : (
      <div
        className={`${
          difficulty === 0 ? 'easy' : difficulty === 1 ? 'medium' : 'hard'
        }`}
      >
        <Grid container>
          {cards
            .sort((a, b) => a.order - b.order)
            .map((card) => (
              <Grid
                item
                xs={6}
                sm={difficulty === 0 ? 6 : difficulty === 1 ? 3 : 4}
                md={difficulty < 2 ? 3 : 2}
                key={card.id}
              >
                <MatchCard
                  {...{
                    ...card,
                    classes: `${
                      difficulty === 0
                        ? 'large'
                        : difficulty === 1
                        ? 'medium'
                        : 'small'
                    }`,
                    selected:
                      selectedCardFirst === card || selectedCardSecond === card,
                    matched: matchedCards.find((x) => x === card.value)
                      ? true
                      : false,
                  }}
                  onClick={() => !isMatched(card) && selectMatchCard({ card })}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    )
  ) : (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className='menu'
    >
      {/* <Button
        color='primary'
        variant='contained'
        value='PLAY'
        onClick={startGame}
      >
        <Typography>PLAY</Typography>
      </Button> */}
    </Grid>
  )
}

export default Game
