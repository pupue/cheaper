import { CompareForm } from "./_CompareForm";
import { RondomImages } from "./_RondomImages";

export default function Home() {
  return (
    <main className="max-w-[375px] mx-auto p-3 py-10">
      <CompareForm />
      <RondomImages />
    </main>
  );
}
