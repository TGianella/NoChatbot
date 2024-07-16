export const DataSentAlert = ({
  debugFormSent,
}: {
  debugFormSent: boolean;
}) => {
  return debugFormSent ? (
    <p className="p-1 mt-1 bg-green-400 rounded border border-green-700">
      Form data sent
    </p>
  ) : (
    <p className="p-1 mt-1 bg-red-400 rounded border border-red-700">
      Form data not sent
    </p>
  );
};
