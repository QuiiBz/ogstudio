import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <Link href="/api/auth/github">Sign in with GitHub</Link>
    </>
  );
}
