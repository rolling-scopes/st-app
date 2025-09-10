import GitHubLogin from "../components/GitHubLogin";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen md:flex-row md:align-center flex-col">
      <div className="flex flex-col h-100 items-center justify-center p-8 md:h-auto md:w-1/2 md:p-16 bg-(--primary) text-center">
        <Image
          src="/logo-rsschool3.png"
          alt="RS School Logo"
          width={500}
          height={500}
          quality={75}
          className="max-w-50 h-auto mb-8"
        />
        <p>Welcome to RS School!</p>
        <p>Learn, code, and grow with our open education platform.</p>
      </div>
      <div className="flex flex-col h-100 md:h-auto md:w-1/2 items-center justify-center md:pt-16">
        <h1>Log In</h1>
        <GitHubLogin />
      </div>
    </main>
  );
}
