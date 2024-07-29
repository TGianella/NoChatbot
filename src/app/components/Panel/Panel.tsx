import { forwardRef, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PanelSuccess } from "@/app/components/PanelSuccess/PanelSuccess";
import { ErrorAlert } from "@/app/components/ErrorAlert/ErrorAlert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type PanelProps = PropsWithChildren<{
  title?: string;
  backgroundColorClass?: string;
  success?: boolean;
  isActive: boolean;
}>;

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { title, children, backgroundColorClass, success, isActive }: PanelProps,
  ref,
) {
  return (
    <Box
      sx={{
        position: { xs: "relative", md: "static" },
        flexGrow: { xs: 1, md: 0 },
        height: { xs: "fit-content", md: "calc(100vh - 5rem)" },
        width: { md: isActive ? "40%" : "30%" },
        overflowY: { md: "scroll" },
        backgroundColor: backgroundColorClass,
        transitionProperty: "width",
        transitionDuration: "0.3s",
      }}
      ref={ref}
    >
      <PanelSuccess success={success} />
      <Stack spacing={5} sx={{ p: 4, filter: success ? "blur(1px)" : "" }}>
        {title?.length && title.length > 0 ? (
          <Typography
            variant="h6"
            component="h2"
            fontWeight="bold"
            align="center"
          >
            {title}
          </Typography>
        ) : null}
        <ErrorBoundary fallback={<ErrorAlert />}>{children}</ErrorBoundary>
      </Stack>
    </Box>
  );
});
