import type { GameTextProps } from "@entities/game-text";
import type { PropsWithUnit } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type InvestigatorTextProps = Omit<GameTextProps, "value"> &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorSignature;
	};
