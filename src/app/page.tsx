"use client";

import { RequestPanel } from "@/app/components/RequestPanel/RequestPanel";
import { ResponsePanel } from "@/app/components/ResponsePanel/ResponsePanel";
import { FinalAnswerPanel } from "@/app/components/FinalAnswerPanel/FinalAnswerPanel";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import InitialData from "@/app/components/RequestPanel/config/initialData.json";

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
  const [responseUid, setResponseUid] = useState("");
  const [questionFormData, setQuestionFormData] = useState(InitialData);
  const [answerFormData, setAnswerFormData] = useState(InitialData);
  const [requestSent, setRequestSent] = useState(false);
  const [answerFormSubmitted, setAnswerFormSubmitted] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <main className="flex m-5 border border-gray-50">
        <RequestPanel
          questionFormData={questionFormData}
          setQuestionFormData={setQuestionFormData}
          requestSent={requestSent}
          setRequestSent={setRequestSent}
        />
        <ResponsePanel
          questionFormData={questionFormData}
          answerFormData={answerFormData}
          setAnswerFormData={setAnswerFormData}
          isLoading={requestSent}
          setFormSubmitted={setAnswerFormSubmitted}
          setResponseUid={setResponseUid}
        />
        <FinalAnswerPanel
          responseUid={responseUid}
          answerFormData={answerFormData}
          isLoading={answerFormSubmitted}
        />
      </main>
    </ThemeProvider>
  );
}
