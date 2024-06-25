import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RequestForm } from "@/components/RequestForm";
import { TestForm } from "@/components/TestForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RequestForm />
    </main>
  );
}
