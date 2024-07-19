import { Skeleton } from "@mui/material";
import { getRandomIntegerInRange } from "@/app/components/skeletons/getRandomIntegerInRange";
import { FormCheckboxSkeleton } from "@/app/components/skeletons/FormSkeleton/FormCheckboxSkeleton";
import { FormRadioGroupSkeleton } from "@/app/components/skeletons/FormSkeleton/FormRadioGroupSkeleton";
import { FormInputSkeleton } from "@/app/components/skeletons/FormSkeleton/FormInputSkeleton";

const components = {
  checkbox: "checkbox",
  radioGroup: "radioGroup",
  input: "input",
};

const getRandomEnumValue = (enumeration: { [key: string]: string }) => {
  const values = Object.keys(enumeration);
  const enumKey = values[Math.floor(Math.random() * values.length)];
  return enumeration[enumKey];
};

export const FormSkeleton = () => {
  const numberOfElements = getRandomIntegerInRange(6, 12);
  const skeleton = Array.from({ length: numberOfElements }, () =>
    getRandomEnumValue(components),
  );

  const pickRandomComponent = (element: string, index: number) => {
    switch (element) {
      case "checkbox":
        return <FormCheckboxSkeleton key={index} />;
      case "radioGroup":
        return <FormRadioGroupSkeleton key={index} />;
      case "input":
        return <FormInputSkeleton key={index} />;
    }
  };

  return (
    <div className="flex flex-col gap-2.5 self-center w-10/12">
      {skeleton.map((element, index) => pickRandomComponent(element, index))}
      <Skeleton variant="text" width="20%" />
    </div>
  );
};
