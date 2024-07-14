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

export const RequestForm = () => {
  const [data, setData] = useState(InitialData);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const currentValidationMode = formSubmitted
    ? "ValidateAndShow"
    : "ValidateAndHide";

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFormSubmitted(true);
          if (errors.length === 0) {
            console.log("coucou", data);
          }
        }}
      >
        <JsonForms
          schema={Schema}
          uischema={UiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => {
            setData(data);
            setErrors(errors ? (errors as ErrorObject[]) : []);
          }}
          validationMode={currentValidationMode}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
