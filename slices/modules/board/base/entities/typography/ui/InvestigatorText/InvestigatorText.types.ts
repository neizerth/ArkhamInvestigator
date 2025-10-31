import type { GameTextProps } from "@modules/core/theme/shared/ui";
import type { PropsWithUnit } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type InvestigatorTextProps = Omit<GameTextProps, "value"> &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorSignature;
	};
