import { Panel } from "@/app/components/Panel/Panel";
import { CircularProgress } from "@mui/material";

type FinalAnswerPanelProps = {
  finalAnswer: string;
  isLoading: boolean;
};

export const FinalAnswerPanel = ({
  finalAnswer,
  isLoading,
}: FinalAnswerPanelProps) => {
  let finalAnswerPanelContent = (
    <p>No answer yet, submit the form returned by the LLM.</p>
  );

  if (isLoading) {
    finalAnswerPanelContent = (
      <div className="self-center py-10">
        <CircularProgress />
      </div>
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
