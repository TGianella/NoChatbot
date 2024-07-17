"use client";

import { RequestPanel } from "@/app/components/RequestPanel/RequestPanel";
import { ResponsePanel } from "@/app/components/ResponsePanel/ResponsePanel";
import { FinalAnswerPanel } from "@/app/components/FinalAnswerPanel/FinalAnswerPanel";
import { useState } from "react";
import { Panel } from "@/app/components/Panel/Panel";

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

  return (
    <main className="flex p-5">
      <RequestPanel setResponseData={setResponseData} />
      {responseData?.schema ? (
        <ResponsePanel
          responseData={responseData}
          setFinalAnswer={setFinalAnswer}
        />
      ) : (
        <Panel backgroundColorClass="bg-sky-200" />
      )}
      {finalAnswer?.length > 0 ? (
        <FinalAnswerPanel finalAnswer={finalAnswer} />
      ) : (
        <Panel backgroundColorClass="bg-sky-300" />
      )}
    </main>
  );
}
