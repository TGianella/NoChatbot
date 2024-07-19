import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";

export const FormRadioGroupSkeleton = () => {
  const labelWidth = getRandomIntegerInRange(60, 80);
  const firstInputWidth = getRandomIntegerInRange(3, 5);
  const secondInputWidth = 8 - firstInputWidth;

  return (
    <>
      <Skeleton width={`${labelWidth}%`} />
      <div className="flex gap-4 items-center">
        <div className={`flex gap-2 items-center w-${firstInputWidth}/12`}>
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="100%" />
        </div>
        <div className={`flex gap-2 items-center w-${secondInputWidth}/12`}>
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="100%" />
        </div>
      </div>
    </>
  );
};
