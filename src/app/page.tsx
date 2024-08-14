import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold text-center">
        Welcome to Jobtrackr 🎉
      </h1>
      <p className="text-2xl mt-3">Track your applications seamlessly</p>
    </main>
  );
}
