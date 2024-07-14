"use client";

import Schema from "./schema.json";
import UiSchema from "./uischema.json";
import InitialData from "./initialData.json";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import Button from "@mui/material/Button";
import { ErrorObject } from "ajv";

const url = "https://mistralgagnant.alwaysdata.net/api";
const initialResponseData = {
  schema: {},
  uischema: {},
  data: {},
};

export const RequestForm = () => {
  const [formData, setFormData] = useState(InitialData);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [debugFormSent, setDebugFormSent] = useState(false);
  const [responseData, setResponseData] = useState(initialResponseData);

  const currentValidationMode = formSubmitted
    ? "ValidateAndShow"
    : "ValidateAndHide";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (errors.length === 0) {
      setDebugFormSent(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setResponseData(json);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setDebugFormSent(false);
    }
  };

  return (
    <div className="App">
      {responseData.schema ? (
        <JsonForms
          schema={responseData.schema}
          uischema={responseData.uischema}
          data={responseData.data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => {
            setFormData(data);
            setErrors(errors ? (errors as ErrorObject[]) : []);
          }}
          validationMode={currentValidationMode}
        />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <JsonForms
              schema={Schema}
              uischema={UiSchema}
              data={formData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data, errors }) => {
                setFormData(data);
                setErrors(errors ? (errors as ErrorObject[]) : []);
              }}
              validationMode={currentValidationMode}
            />
            <Button type="submit">Submit</Button>
          </form>
          {process.env.NODE_ENV === "development" ? (
            debugFormSent ? (
              <p className="p-1 mt-1 bg-green-400 rounded border border-green-700">
                Form data sent
              </p>
            ) : (
              <p className="p-1 mt-1 bg-red-400 rounded border border-red-700">
                Form data not sent
              </p>
            )
          ) : null}
        </>
      )}
    </div>
  );
};
