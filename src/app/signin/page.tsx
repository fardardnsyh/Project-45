import AuthButtons from "@/components/AuthButtons";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { FaCompass } from "react-icons/fa";

export default async function page() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <section className="flex-grow flex flex-col justify-center items-center">
      <div className="text-6xl font-bold mb-10 flex gap-2">
        <FaCompass /> Jobtrackr
      </div>
      <h1 className="text-2xl mb-5">Sign In With</h1>
      <AuthButtons />
    </section>
  );
}
