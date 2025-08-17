import type { PropsWithBoard } from "@modules/board/base/shared/model";
import { getBoardAbilityUseInfo } from "./getBoardAbilityUseInfo";

type Options = PropsWithBoard & {
	abilityId: string;
};

export const getBoardUsedAbility = ({ board, abilityId }: Options) => {
	const { usedAbilities } = board;

	return getBoardAbilityUseInfo({
		usedAbilities,
		abilityId,
	});
};
