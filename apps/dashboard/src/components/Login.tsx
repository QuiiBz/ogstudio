"use client";
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { GitHubIcon } from "./icons/GitHubIcon";
import { GoogleIcon } from "./icons/GoogleIcon";

export function LoginButtons() {
  const [isLoading, setIsLoading] = useState(false);

  function login(url: string) {
    setIsLoading(true);
    // @ts-expect-error
    window.location = url;
  }

  return (
    <>
      <Button
        color="gray"
        variant="soft"
        onClick={() => {
          login("/api/auth/github");
        }}
        loading={isLoading}
      >
        <GitHubIcon />
        Sign in with GitHub
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => {
          login("/api/auth/google");
        }}
        loading={isLoading}
      >
        <GoogleIcon />
        Sign in with Google
      </Button>
    </>
  );
}
