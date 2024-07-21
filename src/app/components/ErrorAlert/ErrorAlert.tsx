import { Alert } from "@mui/material";
import { ResetButton } from "@/app/components/ResetButton/ResetButton";

export const ErrorAlert = () => {
  return (
    <Alert severity="error">
      <div className="flex flex-col gap-2">
        <span>Something went wrong, try reloading the page 😰</span>
        <ResetButton />
      </div>
    </Alert>
  );
};
