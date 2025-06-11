import type { BoardDraft } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat } from "@shared/model";
import {
	type HandleSetBoardValuePropOptions,
	type HandleSetBoardValuePropType,
	handleSetBoardValueProp,
} from "../../handlers";

type Options<K extends InvestigatorBoardStat> = Omit<
	HandleSetBoardValuePropOptions<K>,
	"type" | "state"
>;

export const createBoardValuePropSetter =
	(type: HandleSetBoardValuePropType) =>
	<K extends InvestigatorBoardStat>(
		state: BoardDraft,
		{ payload }: PayloadAction<Options<K>>,
	) => {
		handleSetBoardValueProp({
			...payload,
			state,
			type,
		});
	};
