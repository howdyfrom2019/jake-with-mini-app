"use client";

import { liffState } from "@/states/liff";
import { liff as LiffSDK } from "@line/liff";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function LiffInfo() {
  const liff = useRecoilValue(liffState);

  useEffect(() => {
    LiffSDK.sendMessages([
      {
        type: "text",
        text: "Hello, World!",
      },
    ])
      .then(() => {
        console.log("message sent");
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  return (
    <div>
      <h1>LIFF Info</h1>
      <code>{JSON.stringify(liff, null, 2)}</code>
    </div>
  );
}
