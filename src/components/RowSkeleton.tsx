import { Skeleton } from "@nextui-org/react";
export default function RowSkeleton() {
  return (
    <tr>
      <td className="p-4">
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </td>
      <td>
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </td>
      <td>
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </td>
      <td>
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </td>
      <td>
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </td>
      <td>
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </td>
      <td>
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </td>
    </tr>
  );
}
