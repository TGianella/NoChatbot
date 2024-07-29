import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";
import Stack from "@mui/material/Stack";

export const FormCheckboxSkeleton = () => {
  const labelWidth = getRandomIntegerInRange(60, 80);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Skeleton variant="rectangular" width={20} height={20} />
      <Skeleton width={`${labelWidth}%`} />
    </Stack>
  );
};
