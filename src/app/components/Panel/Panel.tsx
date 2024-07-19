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
      className={`h-fit lg:h-[calc(100vh-2.5rem)] lg:w-4/12 grow flex flex-col items-stretch gap-10 p-5 lg:overflow-y-scroll ${backgroundColorClass}`}
    >
      {title ? (
        <h2 className="font-bold self-center text-center text-xl">{title}</h2>
      ) : null}
      {children}
    </div>
  );
};
