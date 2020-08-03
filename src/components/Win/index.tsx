import React, { useContext, useState, useEffect } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'

const Fireworks = () => (
  <div className='pyro'>
    <div className='before'></div>
    <div className='after'></div>
  </div>
)

const Win = (props: any) => {
  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Typography variant='h1'>You Win!</Typography>
      <div className='pyro'>
        <div className='before'></div>
        <div className='after'></div>
      </div>
    </Grid>
  )
}

export default Win
