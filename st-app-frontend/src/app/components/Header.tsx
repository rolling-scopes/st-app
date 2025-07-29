import { Space, theme } from "antd";
import Link from "next/link";
import { SolidarityUkraine } from "./SolidarityUkraine";
import { ShortTrack } from "./ShortTrack";

export function Header() {
  const { token } = theme.useToken();

  return (
    <Space
      direction="vertical"
      size={0}
      style={{
        width: "100%",
        boxShadow: token.boxShadow,
      }}
    >
      <nav
        className="nav no-print"
        style={{
          background: token.colorBgContainer,
          color: token.colorTextBase,
          padding: "8px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Space className="icons">
          <Link href="/">
            <img
              style={{ height: 30 }}
              className="header-logo"
              src="/static/images/logo-rsschool3.png"
              alt="Rolling Scopes School Logo"
            />
          </Link>
          <ShortTrack />
          <SolidarityUkraine />
        </Space>
      </nav>
    </Space>
  );
}
