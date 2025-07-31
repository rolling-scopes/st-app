import Link from "next/link";
import { SolidarityUkraine } from "./SolidarityUkraine";
import { ShortTrack } from "./ShortTrack";

export function Header() {
  return (
    <header className="w-full shadow bg-background">
      <nav className="nav no-print px-4 py-2">
        <div className="flex gap-2 items-center w-full">
          <Link href="/">
            <img
              className="header-logo h-[30px]"
              src="/static/images/logo-rsschool3.png"
              alt="Rolling Scopes School Logo"
            />
          </Link>
          <ShortTrack />
          <SolidarityUkraine />
        </div>
      </nav>
    </header>
  );
}
