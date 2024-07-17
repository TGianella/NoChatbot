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
import { CircularProgress } from "@mui/material";

type ResponsePanelProps = {
  responseData: ResponseData;
  setFinalAnswer: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setFormSubmitted: Dispatch<SetStateAction<boolean>>;
};

const answerUrl = "https://mistralgagnant.alwaysdata.net/api/answer";

export const ResponsePanel = ({
  responseData,
  setFinalAnswer,
  isLoading,
  setFormSubmitted,
}: ResponsePanelProps) => {
  const [answerFormData, setAnswerFormData] = useState(InitialData);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (errors.length === 0) {
      setFormSubmitted(true);
      const formattedFormData = JSON.stringify({
        data: answerFormData,
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
