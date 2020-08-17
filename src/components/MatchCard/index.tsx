import * as React from 'react'
import { Card, CardMedia, Grid } from '@material-ui/core'

import cardBackground from '../../assets/images/card-background.jpg'
import { GameContext } from '../HomePage'

export type MatchCardProps = {
  id: number
  value: string
  order: number
  selected?: boolean
  matched?: boolean
  imgSrc?: string
  classes?: string
  onClick?: any
}

const MatchCard = (props: MatchCardProps) => {
  const { isDarkMode } = React.useContext(GameContext)

  return (
    <Grid container justify='center' className='match-card-container'>
      <Card
        className={`match-card ${props.classes} ${isDarkMode ? 'dark' : ''} ${
          props.selected ? 'selected' : ''
        } ${props.matched ? 'matched' : ''}`}
        {...{
          onClick: props.onClick,
        }}
      >
        {props.selected || props.matched ? (
          <CardMedia className='back' image={props.imgSrc} />
        ) : (
          <CardMedia className='front' image={cardBackground} />
        )}
      </Card>
    </Grid>
  )
}

export default MatchCard
