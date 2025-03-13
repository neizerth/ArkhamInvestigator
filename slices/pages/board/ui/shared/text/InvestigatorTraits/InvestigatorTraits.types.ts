import { PropsWithUnit } from "@shared/model";
import { TextProps } from "react-native";

export type InvestigatorTraitsProps = TextProps & Partial<PropsWithUnit> & {
  value: string;
}