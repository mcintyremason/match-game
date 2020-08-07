import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core'
import Game from '../Game'
import { MatchCardProps } from '../MatchCard'
import toyStoryCards from '../../common/toyStoryCards'
import MainMenu from '../MainMenu'
import Fireworks from '../Fireworks'

type GameContextType = {
  cards: Array<MatchCardProps>
  difficulty: number
  gameOver: boolean
  gameRunning: boolean
  setCards: React.Dispatch<React.SetStateAction<MatchCardProps[]>>
  setDifficulty: React.Dispatch<React.SetStateAction<number>>
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>
}

const RESET_CARDS_DELAY = 1500
const RESET_GAME_DELAY = 8000
const WIN_DELAY = 1000

export const GameContext = React.createContext<GameContextType>({
  cards: [],
  difficulty: 0,
  gameOver: false,
  gameRunning: false,
  setCards: () => null,
  setDifficulty: () => null,
  setGameOver: () => null,
  setGameRunning: () => null,
})

const HomePage = () => {
  const [cards, setCards] = useState<MatchCardProps[]>(toyStoryCards)
  const [difficulty, setDifficulty] = useState<number>(0)
  const [gameRunning, setGameRunning] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

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

  const toggleIsDarkMode = () => setIsDarkMode(!isDarkMode)

  useEffect(() => {
    selectGameDifficulty()
  }, [difficulty])

  return (
    <Grid className={`home-page-container ${isDarkMode ? 'dark' : 'light'}`}>
      {gameOver && <Fireworks />}
      <Grid container justify='center' alignItems='center' className='title'>
        <Typography variant='h2'>Matching Game</Typography>
      </Grid>
      <Grid container justify='center' alignItems='center'>
        <FormControl component='fieldset'>
          <FormGroup aria-label='position' row>
            <FormControlLabel
              value='top'
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={toggleIsDarkMode}
                  name='darkModeToggle'
                />
              }
              label='Dark Mode'
              labelPlacement='start'
            />
          </FormGroup>
        </FormControl>
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
            gameOver: gameOver,
            gameRunning: gameRunning,
            setCards: setCards,
            setDifficulty: setDifficulty,
            setGameOver: setGameOver,
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
