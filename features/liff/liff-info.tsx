"use client";

import { liffState } from "@/states/liff";
import { useRecoilValue } from "recoil";

export default function LiffInfo() {
  const liff = useRecoilValue(liffState);

  return (
    <div>
      <h1>LIFF Info</h1>
      <code>{JSON.stringify(liff, null, 2)}</code>
    </div>
  );
}
