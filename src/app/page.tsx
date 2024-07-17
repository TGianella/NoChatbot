"use client";

import { RequestPanel } from "@/app/components/RequestPanel/RequestPanel";
import { ResponsePanel } from "@/app/components/ResponsePanel/ResponsePanel";
import { FinalAnswerPanel } from "@/app/components/FinalAnswerPanel/FinalAnswerPanel";
import { useState } from "react";

export type ResponseData = {
  schema: object;
  uischema: {
    type: string;
  };
  data: object;
  uid: string;
};

export default function Home() {
  //@ts-expect-error
  const [responseData, setResponseData] = useState<ResponseData>({});
  const [finalAnswer, setFinalAnswer] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestFormSubmitted, setRequestFormSubmitted] = useState(false);
  const [answerFormSubmitted, setAnswerFormSubmitted] = useState(false);

  return (
    <main className="flex p-5">
      <RequestPanel
        setResponseData={setResponseData}
        setRequestSent={setRequestSent}
        requestSent={requestSent}
        formSubmitted={requestFormSubmitted}
        setFormSubmitted={setRequestFormSubmitted}
      />
      <ResponsePanel
        responseData={responseData}
        setFinalAnswer={setFinalAnswer}
        isLoading={requestFormSubmitted}
        setFormSubmitted={setAnswerFormSubmitted}
      />
      <FinalAnswerPanel
        finalAnswer={finalAnswer}
        isLoading={answerFormSubmitted}
      />
    </main>
  );
}
