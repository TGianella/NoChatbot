import { Panel } from "@/app/components/Panel/Panel";
import { Alert } from "@mui/material";
import { AnswerSkeleton } from "@/app/components/skeletons/AnswerSkeleton/AnswerSkeleton";
import { useEffect, useState } from "react";
import { postFormData } from "@/lib/postFormData";

type FinalAnswerPanelProps = {
  uid: string;
  answerFormData: any;
  shouldFetchData: boolean;
};

export const AnswerPanel = ({
  uid,
  answerFormData,
  shouldFetchData,
}: FinalAnswerPanelProps) => {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState<Error | null>(null);

  useEffect(() => {
    if (shouldFetchData) {
      const fetchData = async () => {
        const formData = {
          data: answerFormData,
          uid: uid,
        };
        const response = await postFormData(formData, setIsError, "answer");
        setAnswer(response.answer);
      };

      fetchData().catch(console.error);
    }
  }, [shouldFetchData]);

  let finalAnswerPanelContent = (
    <p>No answer yet, submit the form returned by the LLM.</p>
  );

  if (shouldFetchData) {
    finalAnswerPanelContent = <AnswerSkeleton />;
  }

  if (isError) {
    finalAnswerPanelContent = (
      <Alert severity="error">
        An error happened while fetching data. Please reload and retry.
      </Alert>
    );
  }

  if (answer?.length > 0) {
    finalAnswerPanelContent = <p>{answer}</p>;
  }

  return (
    <Panel title="Here's your answer" backgroundColorClass="bg-sky-300">
      {finalAnswerPanelContent}
    </Panel>
  );
};
