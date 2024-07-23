import { Alert } from "@mui/material";
import { ResetButton } from "@/app/components/ResetButton/ResetButton";

export const ErrorAlert = () => {
  return (
    <Alert
      severity="error"
      action={<ResetButton color="error">Reload</ResetButton>}
      sx={{ alignItems: "center" }}
    >
      Something went wrong, try reloading the page 😰
    </Alert>
  );
};
