"use client";

import { Skeleton } from "@mui/material";

const linesNumber = Math.floor(Math.random() * (10 - 3) + 3);
const linesLength = Array.from({ length: linesNumber }, () =>
  Math.floor(Math.random() * (100 - 85) + 85),
);

export const AnswerSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      {linesLength.map((length, index) => (
        <Skeleton key={index} width={`${length}%`} />
      ))}
    </div>
  );
};
