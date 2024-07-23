import { forwardRef, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PanelSuccess } from "@/app/components/PanelSuccess/PanelSuccess";
import { ErrorAlert } from "@/app/components/ErrorAlert/ErrorAlert";

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
  const largeWidth = isActive ? "lg:w-[40%]" : "lg:w-[30%]";

  return (
    <div
      className={`relative lg:static grow h-fit lg:grow-0 lg:h-[calc(100vh-5rem)] transition-all duration-300 ${largeWidth} lg:overflow-y-scroll ${backgroundColorClass}`}
      ref={ref}
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
});
