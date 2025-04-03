import type { InvestigatorBoardSource, PropsWithUnit } from "@shared/model";
import type { GameTextProps } from "@widgets/game/game-text";

export type InvestigatorTextProps = Omit<GameTextProps, "value"> &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorBoardSource;
	};
