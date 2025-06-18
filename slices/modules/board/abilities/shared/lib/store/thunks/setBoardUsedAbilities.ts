import { setBoardProp } from "@modules/board/base/shared/lib";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardUsedAbility } from "../../../model";

export type SetUsedAbilitiesPayload = ChangeBoardEventPayload & {
	data: InvestigatorBoardUsedAbility[];
};

export const setBoardUsedAbilities =
	(payload: SetUsedAbilitiesPayload): AppThunk =>
	(dispatch) => {
		const { boardId } = payload;

		dispatch(
			setBoardProp({
				boardId,
				prop: "usedAbilities",
				value: payload.data,
			}),
		);
	};
