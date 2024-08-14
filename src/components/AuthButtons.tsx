"use client";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";

export default function AuthButtons() {
  const { data: session } = useSession();
  if (session) {
    return null;
  }
  return (
    <div className="w-50 flex justify-center gap-3">
      <Button onClick={() => signIn("github")} isIconOnly size="lg">
        <FaGithub className="text-2xl" />
      </Button>
      <Button
        onClick={() => signIn("google")}
        isIconOnly
        size="lg"
        color="primary"
      >
        <FaGoogle className="text-2xl" />
      </Button>
      <Button
        onClick={() => signIn("discord")}
        isIconOnly
        size="lg"
        className="bg-[#5865F2]"
      >
        <FaDiscord className="text-2xl" />
      </Button>
    </div>
  );
}
