import Link from "next/link";
function Navbar() {
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
    </nav>
  );
}

export { Navbar };
