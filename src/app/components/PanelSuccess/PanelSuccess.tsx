import Image from "next/image";
import successIcon from "@/app/assets/succes.png";

export const PanelSuccess = ({ success }: { success?: boolean }) => {
  return (
    <div
      className={`absolute size-full lg:h-[calc(100vh-5rem)] lg:w-4/12 bg-green-100 transition-opacity ease-in-out delay-150 duration-500 ${success ? "opacity-70 z-10" : "opacity-0"} grid place-items-center border-8 border-green-300 border-opacity-70 lg:border-0`}
    >
      {success && (
        <div className="w-1/3 lg:w-1/2 aspect-square relative">
          <Image
            src={successIcon}
            alt="success"
            sizes="300px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};
