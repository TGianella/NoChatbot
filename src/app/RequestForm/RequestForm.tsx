"use client";

import Schema from "./config/schema.json";
import UiSchema from "./config/uischema.json";
import InitialData from "./config/initialData.json";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { FormEvent, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import Button from "@mui/material/Button";
import { ErrorObject } from "ajv";
import { DataSentAlert } from "@/app/components/DataSentAlert/DataSentAlert";

const questionUrl = "https://mistralgagnant.alwaysdata.net/api/question";
const answerUrl = "https://mistralgagnant.alwaysdata.net/api/answer";

export const RequestForm = () => {
  const [questionFormData, setQuestionFormData] = useState(InitialData);
  const [answerFormData, setAnswerFormData] = useState(InitialData);
  const [finalAnswer, setFinalAnswer] = useState("");
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [debugFormSent, setDebugFormSent] = useState(false);
  const [responseData, setResponseData] = useState({});

  const currentValidationMode = formSubmitted
    ? "ValidateAndShow"
    : "ValidateAndHide";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (errors.length === 0) {
      setDebugFormSent(true);
      const formattedFormData = JSON.stringify(questionFormData);
      try {
        const response = await fetch(questionUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: formattedFormData,
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setResponseData(json);
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.error({ message });
      }
    } else {
      setDebugFormSent(false);
    }
  };

  const onAnswerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedFormData = JSON.stringify({
      data: answerFormData,
      //@ts-expect-error
      uid: responseData.uid,
    });
    try {
      const response = await fetch(answerUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: formattedFormData,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setFinalAnswer(json.answer);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.error({ message });
    }
  };

  if (finalAnswer && finalAnswer.length > 0) {
    return <p>{finalAnswer}</p>;
  }

  //@ts-expect-error
  if (responseData.schema) {
    return (
      <form onSubmit={onAnswerSubmit}>
        <JsonForms
          // @ts-expect-error
          schema={responseData.schema}
          // @ts-expect-error
          uischema={responseData.uischema}
          // @ts-expect-error
          data={responseData.data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => {
            setAnswerFormData(data);
            setErrors(errors ? (errors as ErrorObject[]) : []);
          }}
          validationMode={currentValidationMode}
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <JsonForms
          schema={Schema}
          uischema={UiSchema}
          data={questionFormData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => {
            setQuestionFormData(data);
            setErrors(errors ? (errors as ErrorObject[]) : []);
          }}
          validationMode={currentValidationMode}
        />
        <Button type="submit">Submit</Button>
      </form>
      {process.env.NODE_ENV === "development" ? (
        <DataSentAlert debugFormSent={debugFormSent} />
      ) : null}
    </>
  );
};
