import React from 'react';
import { Files } from 'lucide-react';
import { Bug } from 'lucide-react';
import { Menu } from './Menu';

const githubIssuesUrl = 'https://github.com/rolling-scopes/rsschool-app/issues';
const publicRoutes = [
  {
    icon: <Files color="#52c41a" size={16} />,
    name: 'Docs',
    link: 'https://docs.rs.school',
    newTab: true,
  },
  {
    icon: <Bug color="#d60000" size={16} />,
    name: 'Report a bug',
    link: `${githubIssuesUrl}/new?assignees=apalchys&labels=&template=bug-report.md`,
    newTab: true,
  },
];

export const Help = function () {
  return <Menu title="Help" data={publicRoutes} />;
};
