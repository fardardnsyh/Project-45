"use client";

import { Button, Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    setIsLoading(false);
  }, 300);

  return (
    <Input
      type="text"
      name="company"
      variant="bordered"
      placeholder="Search by company, position, notes, or status"
      startContent={<FaSearch />}
      endContent={
        isLoading ? (
          <Button
            isLoading
            variant="light"
            disabled
            isIconOnly
            size="sm"
          ></Button>
        ) : undefined
      }
      size="sm"
      className="w-4/5"
      onChange={(e) => {
        setIsLoading(true);
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
