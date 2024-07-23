import { Panel } from "@/app/components/Panel/Panel";
import { Alert } from "@mui/material";
import { AnswerSkeleton } from "@/app/components/skeletons/AnswerSkeleton/AnswerSkeleton";
import { useEffect, useRef, useState } from "react";
import { postFormData } from "@/lib/postFormData";
import { ResetButton } from "@/app/components/ResetButton/ResetButton";

type FinalAnswerPanelProps = {
  uid: string;
  answerFormData: any;
  shouldFetchData: boolean;
  isActive: boolean;
};

export const AnswerPanel = ({
  uid,
  answerFormData,
  shouldFetchData,
  isActive,
}: FinalAnswerPanelProps) => {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState<Error | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldFetchData) {
      if (panelRef.current && "scrollIntoView" in panelRef.current) {
        panelRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
      const fetchData = async () => {
        const formData = {
          data: answerFormData,
          uid: uid,
        };
        const response = await postFormData(formData, setIsError, "answer");
        setAnswer(response.answer);
        if (panelRef.current && "scrollIntoView" in panelRef.current) {
          panelRef?.current?.scrollIntoView({ behavior: "smooth" });
        }
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
    finalAnswerPanelContent = (
      <>
        <p>{answer}</p>
        <ResetButton>Ask another question</ResetButton>
      </>
    );
  }

  return (
    <Panel
      ref={panelRef}
      title="Here's your answer"
      backgroundColorClass="bg-sky-300"
      isActive={isActive}
    >
      {finalAnswerPanelContent}
    </Panel>
  );
};
