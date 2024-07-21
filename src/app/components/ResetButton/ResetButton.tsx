import Button from "@mui/material/Button";
import { PropsWithChildren } from "react";

export const ResetButton = ({ children }: PropsWithChildren) => {
  return (
    <Button
      onClick={() => {
        window.location.reload();
      }}
    >
      {children}
    </Button>
  );
};
