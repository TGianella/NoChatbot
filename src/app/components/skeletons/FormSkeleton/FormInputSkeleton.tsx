import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";

export const FormInputSkeleton = () => {
  const labelWidth = getRandomIntegerInRange(20, 40);

  return (
    <div className="flex flex-col gap-0.5">
      <Skeleton variant="text" width={`${labelWidth}%`} />
      <Skeleton variant="rounded" width="auto" height={50} />
    </div>
  );
};
