import { PropsWithChildren } from "react";
import { Alert } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { PanelSuccess } from "@/app/components/PanelSuccess/PanelSuccess";
import { ErrorAlert } from "@/app/components/ErrorAlert/ErrorAlert";

type PanelProps = PropsWithChildren<{
  title?: string;
  backgroundColorClass?: string;
  success?: boolean;
}>;

export const Panel = ({
  title,
  children,
  backgroundColorClass,
  success,
}: PanelProps) => {
  return (
    <div
      className={`relative lg:static grow h-fit lg:grow-0 lg:h-[calc(100vh-5rem)] lg:w-4/12 lg:overflow-y-scroll ${backgroundColorClass}`}
    >
      <PanelSuccess success={success} />
      <div
        className={`flex flex-col gap-10 p-5 ${success ? "blur-[1px]" : ""}`}
      >
        {title?.length && title.length > 0 ? (
          <h2 className="font-bold self-center text-center text-xl">{title}</h2>
        ) : null}
        <ErrorBoundary fallback={<ErrorAlert />}>{children}</ErrorBoundary>
      </div>
    </div>
  );
};
