"use client";

import { liffState } from "@/states/liff";
import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function LiffInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initializedLiff, setLiff] = useRecoilState(liffState);
  const [liffError, setLiffError] = useState<string | null>(null);

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
      console.log("LIFF init succeeded");
      setLiff(liff);
      liff
        .sendMessages([
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
    } catch (e) {
      const error = e as Error;
      console.log("LIFF init failed", error);
      setLiffError(error.toString());
    }
  };
  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    initLiff();
  }, []);

  // 하위 컴포넌트에서 liff 내부의 id를 받아와야 유효한 컴포넌트들이 있습니다.
  // 따라서 initialized가 된 이후에 children을 렌더링합니다.
  return (
    <React.Fragment>
      {liffError && (
        <div>
          liff error occured: <code>{JSON.stringify(liffError, null, 2)}</code>
        </div>
      )}
      {initializedLiff ? (
        children
      ) : (
        <div className={"mx-auto mt-10"}>Get Liff Info....</div>
      )}
    </React.Fragment>
  );
}
