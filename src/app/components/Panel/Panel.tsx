export const Panel = ({ title, children, backgroundColorClass }) => {
  return (
    <div
      className={`h-[calc(100vh-2.5rem)] w-4/12 flex flex-col items-stretch gap-10 p-5 ${backgroundColorClass}`}
    >
      {title ? (
        <h2 className="font-bold self-center text-xl">{title}</h2>
      ) : null}
      {children}
    </div>
  );
};
