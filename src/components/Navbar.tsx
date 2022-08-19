import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  async function logout() {
    console.log("logout");
    const logout = await fetch("/api/logout");
    logout.status === 200 ? router.push("/") : false;
  }
  return (
    <nav className="flex flex-wrap m-2">
      <p className="mx-2 font-bold">
        <Link href="/forum">خانه</Link>
      </p>

      <p className="mx-2 font-bold">
        <Link href="/forum">دیدن پست ها</Link>
      </p>

      <p className="mx-2 font-bold">
        <Link href="/createPost">ایجاد پست</Link>
      </p>

      <p className="mx-2 font-bold">
        <Link href="/forum">درباره ما</Link>
      </p>
      <p className="mx-2 font-bold" onClick={() => logout()}>
        خروج
      </p>
    </nav>
  );
}

export { Navbar };
