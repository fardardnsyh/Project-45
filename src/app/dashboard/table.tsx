import { getTableData } from "@/lib/data";
import React from "react";
import { Row } from "./Row";

export default async function TableWrapper({
  query,
  sortColumns,
  filterStatus,
}: {
  query: string;
  sortColumns: object;
  filterStatus: string[];
}) {
  const records = (await getTableData(query, sortColumns, filterStatus)) || [];

  return (
    <>
      {records.length > 0 ? (
        records.map((record) => {
          return (
            <Row
              key={record.id}
              recordId={record.id}
              company={record.company}
              position={record.position}
              date={record.lastUpdated}
              status={record.status}
              notes={record.notes}
              postingLink={record.postingLink}
            />
          );
        })
      ) : (
        <tr>
          <td colSpan={8} className="text-center text-zinc-700">
            No Applications
          </td>
        </tr>
      )}
    </>
  );
}
