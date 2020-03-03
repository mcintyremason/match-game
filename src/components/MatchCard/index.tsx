import * as React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

export type MatchCardType = {
  id: string,
  value: string,
  order: number,
  selected?: boolean,
  onClick?: any
};

class MatchCard extends React.Component<MatchCardType, MatchCardType> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...props
    };
  }

  render() {
    const {
      selected
    } = this.props;

    const {
      value,
      onClick
    } = this.state;

    return (
      <Card className={`card ${selected ? 'selected' : ''}`} {... { onClick }}>
        <CardContent>
          {console.log(selected)}
          <Typography>
            {value}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default MatchCard;