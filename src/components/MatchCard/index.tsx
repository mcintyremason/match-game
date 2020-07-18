import * as React from 'react'
import { Card, CardMedia, Container } from '@material-ui/core'

import cardBackground from '../../assets/images/card-background.jpg'

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
  return (
    <Container className='match-card-container'>
      <Card
        className={`match-card ${props.classes} ${
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
    </Container>
  )
}

export default MatchCard
