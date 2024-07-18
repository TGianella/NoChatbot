import { Skeleton } from "@mui/material";

export const FormSkeleton = () => {
  return (
    <div className="flex flex-col gap-2.5 self-center w-10/12">
      <div className="flex flex-col gap-0.5">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="rounded" width="auto" height={50} />
      </div>
      <div className="flex flex-col gap-0.5">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="rounded" width="auto" height={50} />
      </div>
      <div className="flex flex-col gap-0.5">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="rounded" width="auto" height={50} />
      </div>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="90%" />
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center w-3/12">
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="100%" />
        </div>
        <div className="flex gap-2 items-center w-5/12">
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="100%" />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center w-4/12">
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="100%" />
        </div>
        <div className="flex gap-2 items-center w-3/12">
          <Skeleton variant="circular" width={15} height={15} />
          <Skeleton variant="text" width="100%" />
        </div>
      </div>
      <Skeleton variant="text" width="20%" />
    </div>
  );
};
