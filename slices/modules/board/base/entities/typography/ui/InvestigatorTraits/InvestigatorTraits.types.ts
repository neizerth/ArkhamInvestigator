import type { PropsWithUnit } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";
import type { TextProps } from "react-native";

export type InvestigatorTraitsProps = TextProps &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorSignature;
	};
