import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";
import Stack from "@mui/material/Stack";

export const FormInputSkeleton = () => {
  const labelWidth = getRandomIntegerInRange(20, 40);

  return (
    <Stack spacing={0.5}>
      <Skeleton variant="text" width={`${labelWidth}%`} />
      <Skeleton variant="rounded" width="auto" height={50} />
    </Stack>
  );
};
