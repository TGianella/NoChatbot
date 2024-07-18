import { Panel } from "@/app/components/Panel/Panel";
import { Alert } from "@mui/material";
import { AnswerSkeleton } from "@/app/components/AnswerSkeleton/AnswerSkeleton";
import InitialData from "@/app/components/RequestPanel/config/initialData.json";
import { useEffect, useState } from "react";
import { postFormData } from "@/lib/postFormData";

type FinalAnswerPanelProps = {
  responseUid: string;
  answerFormData: InitialData;
  isLoading: boolean;
};

export const FinalAnswerPanel = ({
  responseUid,
  answerFormData,
  isLoading,
}: FinalAnswerPanelProps) => {
  const [finalAnswer, setFinalAnswer] = useState("");
  const [responseError, setResponseError] = useState<Error | null>(null);

  useEffect(() => {
    if (isLoading) {
      const fetchData = async () => {
        const formData = {
          data: answerFormData,
          uid: responseUid,
        };
        const response = await postFormData(
          formData,
          setResponseError,
          "answer",
        );
        setFinalAnswer(response.answer);
      };

      fetchData().catch(console.error);
    }
  }, [isLoading]);

  let finalAnswerPanelContent = (
    <p>No answer yet, submit the form returned by the LLM.</p>
  );

  if (isLoading) {
    finalAnswerPanelContent = <AnswerSkeleton />;
  }

  if (responseError) {
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
