"use client";

import EditApplication from "@/components/EditApplication";
import { deleteApplication } from "@/lib/data";
import { Button, Spinner } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { FaLink, FaTrash } from "react-icons/fa";

export function Row({
  recordId,
  company,
  position,
  date,
  status,
  postingLink,
  notes,
}: {
  recordId: string;
  company: string;
  position: string;
  date: Date;
  status: string;
  notes: string | null | undefined;
  postingLink: string | null | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <tr key={recordId} id={recordId}>
      <td>{position}</td>
      <td>{company}</td>
      <td
        className={`${
          status === "offer"
            ? "text-emerald-300"
            : status === "rejected"
            ? "text-red-300"
            : ""
        }`}
      >
        {status}
      </td>
      <td>{notes ? notes : <p className="text-zinc-700">none</p>}</td>
      <td>
        {postingLink ? (
          <div className="flex justify-center">
            <a
              href={postingLink}
              target="_blank"
              className="hover:text-blue-500"
            >
              <FaLink />
            </a>
          </div>
        ) : (
          <p className="text-zinc-700">none</p>
        )}
      </td>
      <td>
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "UTC",
        })}
      </td>
      <td>
        <div className="flex justify-center gap-4">
          <EditApplication
            {...{
              recordId,
              company,
              position,
              status,
              notes,
              postingLink,
            }}
          />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              setIsLoading(true);
              try {
                await deleteApplication(formData);
              } finally {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000); // waits at most one second after revalidation to set to false, that way it doesn't flash back to trash can
              }
            }}
          >
            <input type="hidden" name="id" value={recordId} />
            <Button
              isIconOnly
              variant="flat"
              color="danger"
              type="submit"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              <FaTrash />
            </Button>
          </form>
        </div>
      </td>
    </tr>
  );
}
