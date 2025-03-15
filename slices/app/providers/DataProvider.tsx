import type { PropsWithChildren } from "react";
import { useAppData } from "../lib/hooks/useAppData";

export const DataProvider = ({ children }: PropsWithChildren) => {
  useAppData();
  return children;
} 