import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Game from '../Game'
import { MatchCardProps } from '../MatchCard'
import cards from '../../common/cards'

type GameContextType = {
  gameRunning: boolean
  cards: Array<MatchCardProps>
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>
  setCards: React.Dispatch<React.SetStateAction<MatchCardProps[]>>
}

const difficulty = 'cat' ? 0 : 'dog' ? 1 : 2
const RESET_CARDS_DELAY = 1500
const RESET_GAME_DELAY = 3000
const WIN_DELAY = 1000
const cardsFromDifficulty =
  difficulty === 0
    ? cards.filter((card) => card.id <= 8)
    : difficulty === 1
    ? cards.filter((card) => card.id <= 16)
    : cards.filter((card) => card.id <= 24)

export const GameContext = React.createContext<GameContextType>({
  cards: cardsFromDifficulty,
  gameRunning: false,
  setGameRunning: () => null,
  setCards: () => null,
})

const HomePage = () => {
  const [cards, setCards] = useState<MatchCardProps[]>(cardsFromDifficulty)
  const [gameRunning, setGameRunning] = useState<boolean>(false)

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
            gameRunning: gameRunning,
            cards: cards,
            setGameRunning: setGameRunning,
            setCards: setCards,
          }}
        >
          <Game
            difficulty={difficulty}
            resetCardsDelay={RESET_CARDS_DELAY}
            resetGameDelay={RESET_GAME_DELAY}
            winDelay={WIN_DELAY}
          />
        </GameContext.Provider>
      </Grid>
    </Grid>
  )
}
export default HomePage
