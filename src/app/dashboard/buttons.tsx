"use client";
import NewApplication from "@/components/NewApplication";
import Search from "@/components/Search";
import SortModal from "@/components/SortModal";

export default function ButtonRow({
  userEmail,
}: {
  userEmail: string | null | undefined;
}) {
  return (
    <div className="flex flex-row gap-4 w-11/12 justify-between py-4 mx-auto items-center ">
      <div>
        <NewApplication userEmail={userEmail} />
      </div>
      <div className="flex items-center justify-end gap-3 w-2/5 ">
        <SortModal />
        <Search />
      </div>
    </div>
  );
}
