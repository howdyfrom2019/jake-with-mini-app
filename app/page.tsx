import Count from "@/features/clicker/count";
import LiffInfo from "@/features/liff/liff-info";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className={"text-4xl"}>Hello, Liff app!</h1>
      <LiffInfo />
      <Count />
    </div>
  );
}
