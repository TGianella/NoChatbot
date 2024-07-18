"use client";

import { RequestPanel } from "@/app/components/RequestPanel/RequestPanel";
import { ResponsePanel } from "@/app/components/ResponsePanel/ResponsePanel";
import { FinalAnswerPanel } from "@/app/components/FinalAnswerPanel/FinalAnswerPanel";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export type ResponseData = {
  schema: object;
  uischema: {
    type: string;
  };
  data: object;
  uid: string;
};

const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: "10px",
        },
      },
    },
    MuiSlider: {
      defaultProps: {
        valueLabelDisplay: "on",
      },
      styleOverrides: {
        valueLabel: {
          fontSize: 12,
          fontWeight: "normal",
          top: -6,
          backgroundColor: "unset",
          color: "blue",
        },
      },
    },
  },
});

//todo: Move fetching into each affected component to unclutter this component
//todo: allow re-requesting (flush panels on request)

export default function Home() {
  //@ts-expect-error
  const [responseData, setResponseData] = useState<ResponseData>({});
  const [finalAnswer, setFinalAnswer] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestFormSubmitted, setRequestFormSubmitted] = useState(false);
  const [answerFormSubmitted, setAnswerFormSubmitted] = useState(false);
  const [requestError, setRequestError] = useState<Error | null>(null);
  const [responseError, setResponseError] = useState<Error | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <main className="flex m-5 border border-gray-50">
        <RequestPanel
          setResponseData={setResponseData}
          setRequestSent={setRequestSent}
          requestSent={requestSent}
          formSubmitted={requestFormSubmitted}
          setFormSubmitted={setRequestFormSubmitted}
          setRequestError={setRequestError}
        />
        <ResponsePanel
          responseData={responseData}
          setFinalAnswer={setFinalAnswer}
          isLoading={requestSent}
          setFormSubmitted={setAnswerFormSubmitted}
          setResponseError={setResponseError}
          isError={requestError}
        />
        <FinalAnswerPanel
          finalAnswer={finalAnswer}
          isLoading={answerFormSubmitted}
          isError={responseError}
        />
      </main>
    </ThemeProvider>
  );
}
