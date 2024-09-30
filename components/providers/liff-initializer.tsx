"use client";

import { liffState } from "@/states/liff";
import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function LiffInitializer() {
  const setLiff = useSetRecoilState(liffState);
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

  return (
    <React.Fragment>
      {liffError && (
        <div>
          liff error occured: <code>{JSON.stringify(liffError, null, 2)}</code>
        </div>
      )}
    </React.Fragment>
  );
}
