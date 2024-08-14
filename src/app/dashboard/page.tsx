import CardsSkeleton from "@/components/CardsSkeleton";
import RowSkeleton from "@/components/RowSkeleton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ApplicationsContent from "./ApplicationContent";
import ButtonRow from "./buttons";
import CardWrapper from "./cards";
import TableWrapper from "./table";

export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    position?: string;
    company?: string;
    status?: string;
    lastUpdated?: string;
    filterStatus?: string;
  };
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/signin");
  }
  const userEmail = session?.user?.email;
  const query = searchParams?.query || "";
  // get list of columns to sort by
  const sortColumns = {
    position: searchParams?.position || "",
    company: searchParams?.company || "",
    status: searchParams?.status || "",
    lastUpdated: searchParams?.lastUpdated || "",
  };
  const filterStatus = searchParams?.filterStatus?.split(",") ?? [];

  return (
    <section className="flex-grow flex flex-col">
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
      <ButtonRow userEmail={userEmail} />
      {/* Table & Buttons */}
      <ApplicationsContent>
        <Suspense fallback={<RowSkeleton />}>
          <TableWrapper
            query={query}
            sortColumns={sortColumns}
            filterStatus={filterStatus}
          />
        </Suspense>
      </ApplicationsContent>
    </section>
  );
}
