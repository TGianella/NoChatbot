import Button from "@mui/material/Button";
import { PropsWithChildren } from "react";

type ResetButtonProps = PropsWithChildren<{
  color?: "error" | "primary";
}>;

export const ResetButton = ({
  children,
  color = "primary",
}: ResetButtonProps) => {
  return (
    <Button
      onClick={() => {
        window.location.reload();
      }}
      color={color}
    >
      {children}
    </Button>
  );
};
