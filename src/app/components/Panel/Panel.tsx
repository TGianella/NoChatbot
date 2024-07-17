import { PropsWithChildren } from "react";

type PanelProps = PropsWithChildren<{
  title?: string;
  backgroundColorClass?: string;
}>;

export const Panel = ({
  title,
  children,
  backgroundColorClass,
}: PanelProps) => {
  return (
    <div
      className={`h-[calc(100vh-2.5rem)] w-4/12 flex flex-col items-stretch gap-10 p-5 overflow-y-scroll ${backgroundColorClass}`}
    >
      {title ? (
        <h2 className="font-bold self-center text-xl">{title}</h2>
      ) : null}
      {children}
    </div>
  );
};
