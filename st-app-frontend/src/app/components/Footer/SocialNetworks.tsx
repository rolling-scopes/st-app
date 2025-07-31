import * as React from 'react';

import { DiscordOutlined } from '@/app/components/Icons/DiscordOutlined';
import { LinkedInOutlined } from '@/app/components/Icons/LinkedInOutlined';
import Link from 'next/link';
import { GitHubOutlined } from '@/app/components/Icons/GitHubOutlined';
import { YouTubeOutlined } from '@/app/components/Icons/YouTubeOutlined';

type LinkInfo = { icon: React.ReactNode; name: string; link: string; newTab: boolean };

function SocialNetworks() {
  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map((linkInfo: LinkInfo) => (
        <Link
          key={linkInfo.link}
          href={linkInfo.link}
          target={linkInfo.newTab ? '_blank' : '_self'}
          rel={linkInfo.newTab ? 'noopener noreferrer' : undefined}
          className="flex items-center gap-2 text-sm hover:text-gray-600 cursor-pointer"
        >
          {linkInfo.icon}
          {linkInfo.name}
        </Link>
      ))}
    </div>
  );
}

export { SocialNetworks };

const socialLinks = [
  {
    icon: <GitHubOutlined size={24} />,
    name: 'GitHub',
    link: `https://github.com/rolling-scopes/rsschool-app`,
    newTab: true,
  },
  {
    icon: <YouTubeOutlined size={24} />,
    name: 'YouTube',
    link: `https://www.youtube.com/c/rollingscopesschool`,
    newTab: true,
  },
  {
    icon: <DiscordOutlined size={24} />,
    name: 'Discord',
    link: `https://discord.gg/PRADsJB`,
    newTab: true,
  },
  {
    icon: <LinkedInOutlined size={24} />,
    name: 'LinkedIn',
    link: `https://www.linkedin.com/company/the-rolling-scopes-school/`,
    newTab: true,
  },
];
