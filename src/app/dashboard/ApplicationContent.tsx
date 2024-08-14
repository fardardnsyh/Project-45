"use client";
import { ScrollShadow } from "@nextui-org/react";

export default function ApplicationContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollShadow hideScrollBar className="h-[450px] overflow-auto">
      <table className="mt-3 w-11/12 mx-auto">
        <thead>
          <tr>
            <th>Position</th>
            <th>Company</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Posting URL</th>
            <th>Last Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </ScrollShadow>
  );
}
