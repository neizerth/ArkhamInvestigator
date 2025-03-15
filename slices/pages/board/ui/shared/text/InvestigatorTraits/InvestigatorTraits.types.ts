import type { PropsWithUnit } from "@shared/model";
import type { TextProps } from "react-native";

export type InvestigatorTraitsProps = TextProps & Partial<PropsWithUnit> & {
  value: string;
}