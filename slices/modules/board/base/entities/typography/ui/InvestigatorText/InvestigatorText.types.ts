import type { PropsWithUnit } from "@shared/model";
import type { GameTextProps } from "@shared/ui";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type InvestigatorTextProps = Omit<GameTextProps, "value"> &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorSignature;
	};
