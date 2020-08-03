import React, { useContext } from 'react'
import { Grid, ButtonGroup, Button } from '@material-ui/core'

import { GameContext } from '../HomePage'

const MainMenu = () => {
  const { setDifficulty, setGameRunning } = useContext(GameContext)

  const selectMenuOption = (difficulty: number) => {
    setDifficulty(difficulty)
    setGameRunning(true)
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <ButtonGroup
        variant='text'
        color='primary'
        aria-label='text primary button group'
      >
        <Button onClick={() => selectMenuOption(0)}>Easy</Button>
        <Button onClick={() => selectMenuOption(1)}>Medium</Button>
        <Button onClick={() => selectMenuOption(2)}>Hard</Button>
      </ButtonGroup>
    </Grid>
  )
}

export default MainMenu
