"use client";

import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";

const linesNumber = getRandomIntegerInRange(3, 10);
const linesLength = Array.from({ length: linesNumber }, () =>
  getRandomIntegerInRange(85, 100),
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
