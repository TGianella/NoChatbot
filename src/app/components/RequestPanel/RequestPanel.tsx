import { JsonForms } from "@jsonforms/react";
import Schema from "@/app/components/RequestPanel/config/schema.json";
import UiSchema from "@/app/components/RequestPanel/config/uischema.json";
import InitialData from "@/app/components/RequestPanel/config/initialData.json";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { ErrorObject } from "ajv";
import Button from "@mui/material/Button";
import { DataSentAlert } from "@/app/components/DataSentAlert/DataSentAlert";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Panel } from "@/app/components/Panel/Panel";
import { ResponseData } from "@/app/page";

type RequestPanelProps = {
  setResponseData: Dispatch<SetStateAction<ResponseData>>;
  setRequestSent: Dispatch<SetStateAction<boolean>>;
  requestSent: boolean;
};

const questionUrl = "https://mistralgagnant.alwaysdata.net/api/question";

export const RequestPanel = ({
  setResponseData,
  setRequestSent,
  requestSent,
}: RequestPanelProps) => {
  const [questionFormData, setQuestionFormData] = useState(InitialData);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const currentValidationMode = formSubmitted
    ? "ValidateAndShow"
    : "ValidateAndHide";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (errors.length === 0) {
      setRequestSent(true);
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
        setRequestSent(false);
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.error({ message });
      }
    } else {
      setRequestSent(false);
    }
  };

  return (
    <Panel title="Ask your question" backgroundColorClass="bg-sky-100">
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
        <DataSentAlert debugFormSent={requestSent} />
      ) : null}
    </Panel>
  );
};
