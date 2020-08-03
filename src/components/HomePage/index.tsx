import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Game from '../Game'
import { MatchCardProps } from '../MatchCard'
import toyStoryCards from '../../common/toyStoryCards'
import MainMenu from '../MainMenu'

type GameContextType = {
  cards: Array<MatchCardProps>
  difficulty: number
  gameRunning: boolean
  setCards: React.Dispatch<React.SetStateAction<MatchCardProps[]>>
  setDifficulty: React.Dispatch<React.SetStateAction<number>>
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>
}

const RESET_CARDS_DELAY = 1500
const RESET_GAME_DELAY = 3000
const WIN_DELAY = 1000

export const GameContext = React.createContext<GameContextType>({
  cards: [],
  gameRunning: false,
  difficulty: 0,
  setCards: () => null,
  setDifficulty: () => null,
  setGameRunning: () => null,
})

const HomePage = () => {
  const [cards, setCards] = useState<MatchCardProps[]>(toyStoryCards)
  const [difficulty, setDifficulty] = useState<number>(0)
  const [gameRunning, setGameRunning] = useState<boolean>(false)

  const cardsFromDifficulty = () => {
    return difficulty === 0
      ? setCards(toyStoryCards.filter((card) => card.id <= 8))
      : difficulty === 1
      ? setCards(toyStoryCards.filter((card) => card.id <= 16))
      : setCards(toyStoryCards.filter((card) => card.id <= 24))
  }

  const selectGameDifficulty = (): any => {
    setDifficulty(difficulty)
    return cardsFromDifficulty()
  }

  useEffect(() => {
    selectGameDifficulty()
  }, [difficulty])

  return (
    <Grid className='home-page-container'>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        className='title'
      >
        <Typography variant='h2'>Matching Game</Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className='game-container'
      >
        <GameContext.Provider
          value={{
            cards: cards,
            difficulty: difficulty,
            gameRunning: gameRunning,
            setCards: setCards,
            setDifficulty: setDifficulty,
            setGameRunning: setGameRunning,
          }}
        >
          {gameRunning ? (
            <Game
              difficulty={difficulty}
              resetCardsDelay={RESET_CARDS_DELAY}
              resetGameDelay={RESET_GAME_DELAY}
              winDelay={WIN_DELAY}
            />
          ) : (
            <MainMenu />
          )}
        </GameContext.Provider>
      </Grid>
    </Grid>
  )
}
export default HomePage
