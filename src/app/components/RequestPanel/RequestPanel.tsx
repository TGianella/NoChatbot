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

type RequestPanelProps = {
  questionFormData: InitialData;
  setQuestionFormData: Dispatch<SetStateAction<InitialData>>;
  setRequestSent: Dispatch<SetStateAction<boolean>>;
  requestSent: boolean;
};

export const RequestPanel = ({
  questionFormData,
  setQuestionFormData,
  setRequestSent,
  requestSent,
}: RequestPanelProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<ErrorObject[]>([]);

  const currentValidationMode = formSubmitted
    ? "ValidateAndShow"
    : "ValidateAndHide";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (errors.length === 0) {
      setRequestSent(true);
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
