"use client";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaCompass } from "react-icons/fa";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <header>
      <nav className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-r-0 border-l-0 border-b-zinc-900">
        <div className="flex lg:flex-1">
          <Link href="/">
            <div className="flex items-center">
              <FaCompass className="text-2xl mr-3" />
              <p className="mr-3 font-bold">Jobtrackr</p>
            </div>
          </Link>
        </div>
        <div>
          {session ? (
            <div className="flex items-center">
              <Link
                onClick={() => signOut()}
                href=""
                className="hover:text-bright-turquoise-500"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <Link href="/signin" className="hover:text-bright-turquoise-500">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
