import { Panel } from "@/app/components/Panel/Panel";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { ErrorObject } from "ajv";
import Button from "@mui/material/Button";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import InitialData from "@/app/components/RequestPanel/config/initialData.json";
import { ResponseData } from "@/app/page";
import { Alert } from "@mui/material";
import { postFormData } from "@/lib/postFormData";
import { FormSkeleton } from "@/app/components/FormSkeleton/FormSkeleton";

type ResponsePanelProps = {
  setAnswerFormData: Dispatch<SetStateAction<ResponseData>>;
  questionFormData: InitialData;
  isLoading: boolean;
  setFormSubmitted: Dispatch<SetStateAction<boolean>>;
  setResponseUid: Dispatch<SetStateAction<string>>;
};

export const ResponsePanel = ({
  setAnswerFormData,
  questionFormData,
  isLoading,
  setFormSubmitted,
  setResponseUid,
}: ResponsePanelProps) => {
  //@ts-expect-error
  const [responseData, setResponseData] = useState<ResponseData>({});
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [requestError, setRequestError] = useState<Error | null>(null);

  useEffect(() => {
    if (isLoading) {
      const fetchData = async () => {
        const response = await postFormData(
          questionFormData,
          setRequestError,
          "question",
        );
        setResponseData(response);
        setResponseUid(response.uid);
      };

      fetchData().catch(console.error);
    }
  }, [isLoading]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (errors.length === 0) {
      setFormSubmitted(true);
    }
  };

  let panelContent = (
    <p>Nothing to show yet, submit the request form first !</p>
  );

  if (isLoading) {
    panelContent = <FormSkeleton />;
  }

  if (requestError) {
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
