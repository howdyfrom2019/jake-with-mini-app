import { Liff } from "@line/liff";
import { atom } from "recoil";

export const liffKey = "@jake-with-min-app-liff-id";

export const liffState = atom<Liff | null>({
  key: liffKey,
  default: null,
});
