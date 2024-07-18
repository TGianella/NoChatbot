import { JsonForms } from "@jsonforms/react";
import Schema from "@/app/components/InitialQuestionPanel/config/schema.json";
import UiSchema from "@/app/components/InitialQuestionPanel/config/uischema.json";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { ErrorObject } from "ajv";
import Button from "@mui/material/Button";
import { DataSentAlert } from "@/app/components/DataSentAlert/DataSentAlert";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Panel } from "@/app/components/Panel/Panel";
import { QuestionFormData } from "@/types/formData.types";

type RequestPanelProps = {
  formData: QuestionFormData;
  formDataSetter: Dispatch<SetStateAction<QuestionFormData>>;
  requestSent: boolean;
  setRequestSent: Dispatch<SetStateAction<boolean>>;
};

export const InitialQuestionPanel = ({
  formData,
  formDataSetter,
  requestSent,
  setRequestSent,
}: RequestPanelProps) => {
  const [errors, setErrors] = useState<ErrorObject[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (errors.length === 0) {
      setRequestSent(true);
    }
  };

  return (
    <Panel title="Ask your question" backgroundColorClass="bg-sky-100">
      <form onSubmit={handleSubmit}>
        <JsonForms
          schema={Schema}
          uischema={UiSchema}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => {
            formDataSetter(data);
            setErrors(errors ? (errors as ErrorObject[]) : []);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
      {process.env.NODE_ENV === "development" ? (
        <DataSentAlert debugFormSent={requestSent} />
      ) : null}
    </Panel>
  );
};
