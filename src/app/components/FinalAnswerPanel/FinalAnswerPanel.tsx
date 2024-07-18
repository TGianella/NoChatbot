import { Panel } from "@/app/components/Panel/Panel";
import { Alert, CircularProgress } from "@mui/material";
import { AnswerSkeleton } from "@/app/components/AnswerSkeleton/AnswerSkeleton";

type FinalAnswerPanelProps = {
  finalAnswer: string;
  isLoading: boolean;
  isError: Error | null;
};

export const FinalAnswerPanel = ({
  finalAnswer,
  isLoading,
  isError,
}: FinalAnswerPanelProps) => {
  let finalAnswerPanelContent = (
    <p>No answer yet, submit the form returned by the LLM.</p>
  );

  if (isLoading) {
    finalAnswerPanelContent = <AnswerSkeleton />;
  }

  if (isError) {
    finalAnswerPanelContent = (
      <Alert severity="error">
        An error happened while fetching data. Please reload and retry.
      </Alert>
    );
  }

  if (finalAnswer?.length > 0) {
    finalAnswerPanelContent = <p>{finalAnswer}</p>;
  }

  return (
    <Panel title="Here's your answer" backgroundColorClass="bg-sky-300">
      {finalAnswerPanelContent}
    </Panel>
  );
};
