import { useAppData } from "@shared/lib";
import { PropsWithChildren } from "react";

export const DataProvider = ({ children }: PropsWithChildren) => {
  useAppData();
  return children;
} 