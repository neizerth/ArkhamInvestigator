import type { PropsWithUnit } from "@shared/model";
import type { GameTextProps } from "@widgets/game/game-text";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type InvestigatorTextProps = Omit<GameTextProps, "value"> &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorSignature;
	};
