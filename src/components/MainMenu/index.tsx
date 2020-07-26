import React, { useContext, useState, useEffect } from 'react'
import { Grid, ButtonGroup, Button } from '@material-ui/core'

// import { Button, Grid, Typography } from '@material-ui/core'
// import MatchCard, { MatchCardProps } from '../MatchCard'

import { GameContext } from '../HomePage'

// type MainMenuProps = {
//   // difficulty: number
// }

const MainMenu = () => {
  const { setDifficulty } = useContext(GameContext)
  // const { difficulty, resetCardsDelay, resetGameDelay, winDelay } = props
  // const [difficulty, setDifficulty] = useState<MatchCardProps | null>(null)

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <ButtonGroup
        variant='text'
        color='primary'
        aria-label='text primary button group'
      >
        <Button onClick={() => setDifficulty(0)}>Easy</Button>
        <Button onClick={() => setDifficulty(1)}>Medium</Button>
        <Button onClick={() => setDifficulty(2)}>Hard</Button>
      </ButtonGroup>
    </Grid>
  )
}

export default MainMenu
