"use client";

import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";
import Stack from "@mui/material/Stack";

const linesNumber = getRandomIntegerInRange(3, 10);
const linesLength = Array.from({ length: linesNumber }, () =>
  getRandomIntegerInRange(85, 100),
);

export const AnswerSkeleton = () => {
  return (
    <Stack spacing={1} alignSelf="center" width="83%">
      {linesLength.map((length, index) => (
        <Skeleton key={index} width={`${length}%`} />
      ))}
    </Stack>
  );
};
