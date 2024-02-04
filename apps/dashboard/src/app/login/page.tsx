import { Button } from "../../components/forms/Button";
import { GitHubIcon } from "../../components/icons/GitHubIcon";
import { GoogleIcon } from "../../components/icons/GoogleIcon";

export const metadata = {
  title: "Templates - OG Studio",
  description: "Sign in to export your images and sync them across devices.",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-32">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-gray-800 text-xl">Sign in</h2>
        <p className="text-sm text-gray-600 text-center">
          Create an account to export your images to URLs <br /> and make them
          available in all your devices.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button href="/api/auth/github" icon={<GitHubIcon />}>
          Sign in with GitHub
        </Button>
        <Button href="/api/auth/google" icon={<GoogleIcon />}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
