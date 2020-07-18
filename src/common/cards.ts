import { MatchCardProps } from 'components/MatchCard';

import woody from '../assets/images/woody.jpg';
import buzz from '../assets/images/buzz-lightyear.jpg';
import boPeep from '../assets/images/bo-peep.jpg';
import forky from '../assets/images/forky.jpg';
import mrPotatoHead from '../assets/images/mr-potato-head_700x352.jpg';
import mrsPotatoHead from '../assets/images/mrs-potato-head.webp';
import slinkyDog from '../assets/images/slinky-dog.webp';
import aliens from '../assets/images/aliens.jpg';
import armyMen from '../assets/images/army-men-toy-story-1.jpg';
import rex from '../assets/images/rex.jpg';
import bullseye from '../assets/images/bullseye.jpg';
import hamm from '../assets/images/hamm.jpg';

const cards: Array<MatchCardProps> = [{
    id: 1,
    value: 'Woody',
    order: Math.floor(Math.random() * 24),
    imgSrc: woody,
    selected: false
  },
  {
    id: 2,
    value: 'Woody',
    order: Math.floor(Math.random() * 24),
    imgSrc: woody,
    selected: false
  },
  {
    id: 3,
    value: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 24),
    imgSrc: buzz,
    selected: false
  },
  {
    id: 4,
    value: 'Buzz Lightyear',
    order: Math.floor(Math.random() * 24),
    imgSrc: buzz,
    selected: false
  },
  {
    id: 5,
    value: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 24),
    imgSrc: boPeep,
    selected: false
  },
  {
    id: 6,
    value: 'Lil Bo Peep',
    order: Math.floor(Math.random() * 24),
    imgSrc: boPeep,
    selected: false
  },
  {
    id: 7,
    value: 'Forky',
    order: Math.floor(Math.random() * 24),
    imgSrc: forky,
    selected: false
  },
  {
    id: 8,
    value: 'Forky',
    order: Math.floor(Math.random() * 24),
    imgSrc: forky,
    selected: false
  },
  {
    id: 9,
    value: 'Mr. Potato Head',
    order: Math.floor(Math.random() * 24),
    imgSrc: mrPotatoHead,
    selected: false
  },
  {
    id: 10,
    value: 'Mr. Potato Head',
    order: Math.floor(Math.random() * 24),
    imgSrc: mrPotatoHead,
    selected: false
  },
  {
    id: 11,
    value: 'Mrs. Potato Head',
    order: Math.floor(Math.random() * 24),
    imgSrc: mrsPotatoHead,
    selected: false
  },
  {
    id: 12,
    value: 'Mrs. Potato Head',
    order: Math.floor(Math.random() * 24),
    imgSrc: mrsPotatoHead,
    selected: false
  },
  {
    id: 13,
    value: 'Slinky Dog',
    order: Math.floor(Math.random() * 24),
    imgSrc: slinkyDog,
    selected: false
  },
  {
    id: 14,
    value: 'Slinky Dog',
    order: Math.floor(Math.random() * 24),
    imgSrc: slinkyDog,
    selected: false
  },
  {
    id: 15,
    value: 'aliens',
    order: Math.floor(Math.random() * 24),
    imgSrc: aliens,
    selected: false
  },
  {
    id: 16,
    value: 'aliens',
    order: Math.floor(Math.random() * 24),
    imgSrc: aliens,
    selected: false
  },
  {
    id: 17,
    value: 'Army Men',
    order: Math.floor(Math.random() * 24),
    imgSrc: armyMen,
    selected: false
  },
  {
    id: 18,
    value: 'Army Men',
    order: Math.floor(Math.random() * 24),
    imgSrc: armyMen,
    selected: false
  },
  {
    id: 19,
    value: 'Rex',
    order: Math.floor(Math.random() * 24),
    imgSrc: rex,
    selected: false
  },
  {
    id: 20,
    value: 'Rex',
    order: Math.floor(Math.random() * 24),
    imgSrc: rex,
    selected: false
  },
  {
    id: 21,
    value: 'Bullseye',
    order: Math.floor(Math.random() * 24),
    imgSrc: bullseye,
    selected: false
  },
  {
    id: 22,
    value: 'Bullseye',
    order: Math.floor(Math.random() * 24),
    imgSrc: bullseye,
    selected: false
  },
  {
    id: 23,
    value: 'Hamm',
    order: Math.floor(Math.random() * 24),
    imgSrc: hamm,
    selected: false
  },
  {
    id: 24,
    value: 'Hamm',
    order: Math.floor(Math.random() * 24),
    imgSrc: hamm,
    selected: false
  }
];

export default cards;