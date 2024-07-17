import { Panel } from "@/app/components/Panel/Panel";

export const FinalAnswerPanel = ({ finalAnswer }: { finalAnswer: string }) => {
  return (
    <Panel title="Here's your answer" backgroundColorClass="bg-sky-300">
      {finalAnswer}
    </Panel>
  );
};
