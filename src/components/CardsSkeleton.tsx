import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

export default function CardsSkeleton() {
  return (
    <section className="flex flex-row justify-center gap-4 w-100">
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div>
          <Skeleton className="w-4/5 mx-auto rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div>
          <Skeleton className="w-4/5 mx-auto rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div>
          <Skeleton className="w-4/5 mx-auto rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div>
          <Skeleton className="w-4/5 mx-auto rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg w-1/2 mx-auto">
          <div className="h-10 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div>
          <Skeleton className="w-4/5 mx-auto rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </section>
  );
}
