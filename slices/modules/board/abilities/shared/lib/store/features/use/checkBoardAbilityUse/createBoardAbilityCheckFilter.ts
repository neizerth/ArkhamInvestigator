import {
	checkBoardAbilityUseFailed,
	checkBoardAbilityUseSuccess,
} from "./checkBoardAbilityUse";

type Options = {
	abilityId: string;
	success: boolean;
};

export const createBoardAbilityCheckFilter = ({
	abilityId,
	success,
}: Options) => {
	const actionCreator = success
		? checkBoardAbilityUseSuccess
		: checkBoardAbilityUseFailed;

	return (action: unknown) => {
		if (!actionCreator.match(action)) {
			return false;
		}

		return action.payload.abilityId === abilityId;
	};
};
