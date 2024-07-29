import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";
import Stack from "@mui/material/Stack";

export const FormRadioGroupSkeleton = () => {
  const labelWidth = getRandomIntegerInRange(60, 80);

  return (
    <>
      <Skeleton width={`${labelWidth}%`} />
      <Stack direction="row" spacing={4}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: `${getRandomIntegerInRange(20, 80)}%` }}
          alignItems="center"
        >
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="90%" />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: `${getRandomIntegerInRange(20, 80)}%` }}
          alignItems="center"
        >
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="90%" />
        </Stack>
      </Stack>
    </>
  );
};
