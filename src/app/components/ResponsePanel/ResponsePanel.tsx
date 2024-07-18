import { Panel } from "@/app/components/Panel/Panel";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { ErrorObject } from "ajv";
import Button from "@mui/material/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import InitialData from "@/app/components/RequestPanel/config/initialData.json";
import { ResponseData } from "@/app/page";
import { Alert, CircularProgress } from "@mui/material";
import { postFormData } from "@/lib/postFormData";

type ResponsePanelProps = {
  responseData: ResponseData;
  setFinalAnswer: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setFormSubmitted: Dispatch<SetStateAction<boolean>>;
  setResponseError: Dispatch<SetStateAction<Error | null>>;
  isError: Error | null;
};

export const ResponsePanel = ({
  responseData,
  setFinalAnswer,
  isLoading,
  setFormSubmitted,
  setResponseError,
  isError,
}: ResponsePanelProps) => {
  const [answerFormData, setAnswerFormData] = useState(InitialData);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (errors.length === 0) {
      const formData = {
        data: answerFormData,
        uid: responseData.uid,
      };
      const response = await postFormData(
        formData,
        setFormSubmitted,
        setResponseError,
        "answer",
      );
      setFinalAnswer(response.answer);
    }
  };

  let panelContent = (
    <p>Nothing to show yet, submit the request form first !</p>
  );

  if (isLoading) {
    panelContent = (
      <div className="self-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    panelContent = (
      <Alert severity="error">
        An error happened while fetching data. Please reload and retry.
      </Alert>
    );
  }

  if (responseData?.schema) {
    panelContent = (
      <form onSubmit={handleSubmit}>
        <JsonForms
          schema={responseData.schema}
          uischema={responseData.uischema}
          data={responseData.data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => {
            setAnswerFormData(data);
            setErrors(errors ? (errors as ErrorObject[]) : []);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  }

  return (
    <Panel title="Fill the form" backgroundColorClass="bg-sky-200">
      {panelContent}
    </Panel>
  );
};
