"use client";

import { liffState } from "@/states/liff";
import { useRecoilValue } from "recoil";

export default function LiffInfo() {
  const liff = useRecoilValue(liffState);

  return (
    <div className={"rounded-md bg-zinc-100 p-2"}>
      <header>LIFF Info</header>
      <code>{JSON.stringify(liff, null, 2)}</code>
    </div>
  );
}
