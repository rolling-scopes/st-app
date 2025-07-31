import React from "react";
import Link from "next/link";

type MenuProps = {
  title: string;
  data: LinkInfo[];
};

type LinkInfo = {
  icon: React.ReactNode;
  name: string;
  link: string;
  newTab: boolean;
};

class Menu extends React.Component<MenuProps> {
  render() {
    const { title, data } = this.props;
    return (
      <div>
        <h3 className="mb-4 font-medium text-base">{title}</h3>
        <ul className="flex flex-col gap-3 ml-4">
          {data.map((linkInfo) => (
            <li
              className="mb-2"
              key={linkInfo.link}
            >
              <Link
                href={linkInfo.link}
                target={linkInfo.newTab ? "_blank" : "_self"}
                prefetch={false}
                className="flex items-center gap-2 text-blue-600  hover:text-blue-400 text-sm"
              >
                {linkInfo.icon}
                {linkInfo.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export { Menu };
