import { CompareForm } from "./_CompareForm";
import { RondomImages } from "./_RondomImages";

export default function Home() {
  return (
    <main className="flex flex-col min-h-svh mx-auto border-y-4 border-black px-3 pt-4">
      <div className="max-w-[375px] mx-auto flex flex-col flex-grow">
        <div className="flex-grow grid grid-rows-[1fr_auto]">
          <CompareForm />
          <div className="translate-y-[1px] mt-2 ml-auto">
            <RondomImages />
          </div>
        </div>
      </div>
    </main>
  );
}
