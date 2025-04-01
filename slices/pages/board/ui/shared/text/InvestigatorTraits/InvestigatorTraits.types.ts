import type { InvestigatorBoardSource, PropsWithUnit } from "@shared/model";
import type { TextProps } from "react-native";

export type InvestigatorTraitsProps = TextProps &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorBoardSource;
	};
