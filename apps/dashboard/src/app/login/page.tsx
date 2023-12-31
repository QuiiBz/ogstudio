import { Button } from "../../components/forms/Button";
import { GitHubIcon } from "../../components/icons/GitHubIcon";
import { GoogleIcon } from "../../components/icons/GoogleIcon";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-32">
      <h2 className="text-gray-800 text-xl">Sign in</h2>
      <div className="flex flex-col items-center gap-2">
        <Button href="/api/auth/github" icon={<GitHubIcon />}>Sign in with GitHub</Button>
        <Button href="/api/auth/google" icon={<GoogleIcon />}>Sign in with Google</Button>
      </div>
    </div>
  );
}
