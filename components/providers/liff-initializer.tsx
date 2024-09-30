"use client";

import { liffState } from "@/states/liff";
import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function LiffInitializer() {
  const setLiff = useSetRecoilState(liffState);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      .then(() => {
        console.log("LIFF init succeeded.");
        setLiff(liff);
      })
      .catch((error: Error) => {
        console.log("LIFF init failed.");
        setLiffError(error.toString());
      });
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
