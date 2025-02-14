import { JsonForms } from "@jsonforms/react";
import Schema from "@/app/components/InitialQuestionPanel/config/schema.json";
import UiSchema from "@/app/components/InitialQuestionPanel/config/uischema.json";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { ErrorObject } from "ajv";
import Button from "@mui/material/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Panel } from "@/app/components/Panel/Panel";
import { QuestionFormData } from "@/types/formData.types";
import Stack from "@mui/material/Stack";
import { FormSkeleton } from "@/app/components/skeletons/FormSkeleton/FormSkeleton";
import { AnswerSkeleton } from "@/app/components/skeletons/AnswerSkeleton/AnswerSkeleton";

type RequestPanelProps = {
  formData: QuestionFormData;
  formDataSetter: Dispatch<SetStateAction<QuestionFormData>>;
  requestSent: boolean;
  requestSentSetter: Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
};

export const InitialQuestionPanel = ({
  formData,
  formDataSetter,
  requestSent,
  requestSentSetter,
  isActive,
}: RequestPanelProps) => {
  const [errors, setErrors] = useState<ErrorObject[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (errors.length === 0) {
      requestSentSetter(true);
    }
  };

  return (
    <Panel
      title="Ask your question"
      backgroundColorClass="#b9ddfa"
      success={requestSent}
      isActive={isActive}
    >
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
    </Panel>
  );
};
