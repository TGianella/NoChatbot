import { Alert } from "@mui/material";

export const DataSentAlert = ({
  debugFormSent,
}: {
  debugFormSent: boolean;
}) => {
  const severity = debugFormSent
    ? ("success" as "success")
    : ("error" as "error");
  return (
    <Alert severity={severity}>
      Form data{debugFormSent ? "" : " not"} sent
    </Alert>
  );
};
