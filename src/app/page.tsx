import { CompareForm } from "./_CompareForm";

export default function Home() {
  return (
    <main className="max-w-[375px] mx-auto h-screen border-black border-4 p-6">
      <h1 className="text-[24px] font-bold mb-6">Cheaper</h1>
      <CompareForm />
    </main>
  );
}
