"use client";

import { InitialQuestionPanel } from "@/app/components/InitialQuestionPanel/InitialQuestionPanel";
import { GeneratedFormPanel } from "@/app/components/GeneratedFormPanel/GeneratedFormPanel";
import { AnswerPanel } from "@/app/components/FinalAnswerPanel/AnswerPanel";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import InitialData from "@/app/components/InitialQuestionPanel/config/initialData.json";

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

//todo: fix InitialData typing and rename all variables
//todo: allow re-requesting (flush panels on request)
//todo: generate random form skeletons

export default function Home() {
  const [uid, setUid] = useState("");
  const [initialQuestionFormData, setInitialQuestionFormData] =
    useState(InitialData);
  const [initialQuestionSent, setInitialQuestionSent] = useState(false);
  const [generatedFormData, setGeneratedFormData] = useState({});
  const [generatedFormSubmitted, setGeneratedFormSubmitted] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <main className="flex m-5">
        <InitialQuestionPanel
          formData={initialQuestionFormData}
          formDataSetter={setInitialQuestionFormData}
          requestSent={initialQuestionSent}
          setRequestSent={setInitialQuestionSent}
        />
        <GeneratedFormPanel
          initialFormData={initialQuestionFormData}
          generatedFormDataSetter={setGeneratedFormData}
          shouldFetchData={initialQuestionSent}
          generatedFormSubmittedSetter={setGeneratedFormSubmitted}
          uidSetter={setUid}
        />
        <AnswerPanel
          uid={uid}
          answerFormData={generatedFormData}
          shouldFetchData={generatedFormSubmitted}
        />
      </main>
    </ThemeProvider>
  );
}
