import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";

export const FormCheckboxSkeleton = () => {
  const labelWidth = getRandomIntegerInRange(60, 80);

  return (
    <div className="flex gap-3 items-center">
      <Skeleton variant="rectangular" width={20} height={20} />
      <Skeleton width={`${labelWidth}%`} />
    </div>
  );
};
