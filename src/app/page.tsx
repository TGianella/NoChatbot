"use client";

import { InitialQuestionPanel } from "@/app/components/InitialQuestionPanel/InitialQuestionPanel";
import { GeneratedFormPanel } from "@/app/components/GeneratedFormPanel/GeneratedFormPanel";
import { AnswerPanel } from "@/app/components/FinalAnswerPanel/AnswerPanel";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import InitialData from "@/app/components/InitialQuestionPanel/config/initialData.json";
import Image from "next/image";
import githubLogoWhite from "./github-mark-white.png";

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

export default function Home() {
  const [uid, setUid] = useState("");
  const [initialQuestionFormData, setInitialQuestionFormData] =
    useState(InitialData);
  const [initialQuestionSent, setInitialQuestionSent] = useState(false);
  const [generatedFormData, setGeneratedFormData] = useState({});
  const [generatedFormSubmitted, setGeneratedFormSubmitted] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <header className="flex justify-end items-center h-10 w-screen bg-sky-800 pe-3">
        <span className="text-white font-bold">NoChatbot</span>
      </header>
      <main className="h-fit lg:h-[calc(100vh-5rem)] flex flex-col lg:flex-row">
        <InitialQuestionPanel
          formData={initialQuestionFormData}
          formDataSetter={setInitialQuestionFormData}
          requestSent={initialQuestionSent}
          requestSentSetter={setInitialQuestionSent}
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
      <footer className="flex justify-end items-center h-10 w-screen bg-sky-800 pe-3">
        <a href={"https://github.com/TGianella/NoChatbot"}>
          <Image
            src={githubLogoWhite}
            alt={"github logo"}
            height={40}
            width={40}
          />
        </a>
      </footer>
    </ThemeProvider>
  );
}
