import config from "@/config/config";
import { Dispatch, SetStateAction } from "react";

export const postFormData = async (
  formData: any,
  setFormSubmitted: Dispatch<SetStateAction<boolean>>,
  endpoint: string,
) => {
  setFormSubmitted(true);
  const formattedFormData = JSON.stringify(formData);
  try {
    const response = await fetch(`${config.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: formattedFormData,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.error({ message });
  }
};
