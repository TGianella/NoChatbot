import { Panel } from "@/app/components/Panel/Panel";

export const FinalAnswerPanel = ({ finalAnswer }) => {
  return (
    <Panel title="Here's your answer" backgroundColorClass="bg-sky-300">
      {finalAnswer}
    </Panel>
  );
};
