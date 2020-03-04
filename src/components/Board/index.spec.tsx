import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { Grid } from '@material-ui/core';

import Board from '.';

const cards = [{
  id: '1',
  value: 'A',
  order: Math.floor(Math.random() * 4)
},
{
  id: '2',
  value: 'B',
  order: Math.floor(Math.random() * 4)
},
{
  id: '3',
  value: 'C',
  order: Math.floor(Math.random() * 4)
},
{
  id: '4',
  value: 'D',
  order: Math.floor(Math.random() * 4)
}];

const wrapper = mount(<Board {... { cards } } />);

describe('Board Component', () => {
  it('renders four children', () => {
    expect(wrapper.find(Grid).children()).to.have.lengthOf(cards.length + 1);
  });
});
