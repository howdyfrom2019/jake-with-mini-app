"use client";

import LiffInitializer from "@/components/providers/liff-initializer";
import { Toaster } from "@/components/ui/sonner";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <Toaster position={"top-center"} />
      <LiffInitializer>{children}</LiffInitializer>
    </RecoilRoot>
  );
}
