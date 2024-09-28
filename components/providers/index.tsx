"use client";

import LiffInitializer from "@/components/providers/liff-initializer";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <LiffInitializer />
      {children}
    </RecoilRoot>
  );
}
