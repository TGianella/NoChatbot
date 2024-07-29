"use client";

import { InitialQuestionPanel } from "@/app/components/InitialQuestionPanel/InitialQuestionPanel";
import { GeneratedFormPanel } from "@/app/components/GeneratedFormPanel/GeneratedFormPanel";
import { AnswerPanel } from "@/app/components/FinalAnswerPanel/AnswerPanel";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import InitialData from "@/app/components/InitialQuestionPanel/config/initialData.json";
import Image from "next/image";
import githubLogoWhite from "./assets/github-mark-white.png";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

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

//todo: history of requests
//todo: remove redundant error handling logic in panels
//todo: make panels fill screen on mobile

export default function Home() {
  const [uid, setUid] = useState("");
  const [initialQuestionFormData, setInitialQuestionFormData] =
    useState(InitialData);
  const [initialQuestionSent, setInitialQuestionSent] = useState(false);
  const [generatedFormData, setGeneratedFormData] = useState({});
  const [generatedFormSubmitted, setGeneratedFormSubmitted] = useState(false);

  const activePanel = initialQuestionSent
    ? generatedFormSubmitted
      ? "answer"
      : "generated"
    : "question";

  return (
    <ThemeProvider theme={theme}>
      <Stack
        component="header"
        direction="row-reverse"
        alignItems="center"
        sx={{
          width: "100vw",
          height: "2.5rem",
          paddingInlineEnd: "0.75rem",
          backgroundColor: "rgb(7 89 133)",
        }}
      >
        <Typography variant="h6" component="h1" fontWeight="bold" color="white">
          NoChatbot
        </Typography>
      </Stack>
      <Container component="main" disableGutters maxWidth={false}>
        <Stack direction={{ xs: "column", md: "row" }}>
          <InitialQuestionPanel
            formData={initialQuestionFormData}
            formDataSetter={setInitialQuestionFormData}
            requestSent={initialQuestionSent}
            requestSentSetter={setInitialQuestionSent}
            isActive={activePanel === "question"}
          />
          <GeneratedFormPanel
            initialFormData={initialQuestionFormData}
            generatedFormDataSetter={setGeneratedFormData}
            shouldFetchData={initialQuestionSent}
            generatedFormSubmitted={generatedFormSubmitted}
            generatedFormSubmittedSetter={setGeneratedFormSubmitted}
            uidSetter={setUid}
            isActive={activePanel === "generated"}
          />
          <AnswerPanel
            uid={uid}
            answerFormData={generatedFormData}
            shouldFetchData={generatedFormSubmitted}
            isActive={activePanel === "answer"}
          />
        </Stack>
      </Container>
      <Stack
        component="footer"
        direction="row-reverse"
        alignItems="center"
        sx={{
          width: "100vw",
          height: "2.5rem",
          paddingInlineEnd: "0.75rem",
          backgroundColor: "rgb(7 89 133)",
        }}
      >
        <Link href={"https://github.com/TGianella/NoChatbot"}>
          <Image
            src={githubLogoWhite}
            alt={"github logo"}
            height={40}
            width={40}
          />
        </Link>
      </Stack>
    </ThemeProvider>
  );
}
