import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Trophy } from 'lucide-react';
import { Heart } from 'lucide-react';

import { Menu } from './Menu';

const publicRoutes = [
  {
    icon: <ThumbsUp color="blue" size={16} />,
    name: 'Say Thank you (Discord >> #gratitude)',
    link: `/gratitude`,
    newTab: false,
  },
  {
    icon: <Trophy color="#d60000" size={16} />,
    name: 'Heroes page',
    link: `/heroes`,
    newTab: false,
  },
  {
    icon: <Heart color="#eb2f96" size={16} />,
    name: 'Feedback on RS School',
    link: `https://docs.google.com/forms/d/1F4NeS0oBq-CY805aqiPVp6CIrl4_nIYJ7Z_vUcMOFrQ/viewform`,
    newTab: true,
  },
];

export const Feedback = function () {
  return <Menu title="Feedback" data={publicRoutes} />;
};
