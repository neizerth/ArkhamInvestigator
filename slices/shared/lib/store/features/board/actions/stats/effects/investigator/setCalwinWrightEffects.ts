import type { AppThunk, InvestigatorBoardStat } from "@shared/model";
import { dec, inc } from "ramda";
import { reduceCurrentStat } from "../../current/reduceCurrentStat";
import type { SetStatChangeEffectOptions } from "../setStatChangeEffect";

type Options<T extends InvestigatorBoardStat> = Omit<
	SetStatChangeEffectOptions<T>,
	"code"
>;
export const setCalwinWrightEffects =
	<T extends InvestigatorBoardStat>(options: Options<T>): AppThunk =>
	(dispatch) => {
		const { boardId } = options;
		const boardOptions = {
			boardId,
		};

		const reducer = options.value > options.prevValue ? dec : inc;

		const params = {
			options: boardOptions,
			reducer,
		};

		if (options.type === "health") {
			dispatch(
				reduceCurrentStat({
					type: "combat",
					...params,
				}),
			);
			dispatch(
				reduceCurrentStat({
					type: "agility",
					...params,
				}),
			);
			return;
		}
		if (options.type === "sanity") {
			dispatch(
				reduceCurrentStat({
					type: "willpower",
					...params,
				}),
			);
			dispatch(
				reduceCurrentStat({
					type: "intellect",
					...params,
				}),
			);
			return;
		}
	};
