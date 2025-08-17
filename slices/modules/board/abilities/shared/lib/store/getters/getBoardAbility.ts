import type { PropsWithBoard } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib";

type Options = PropsWithBoard & {
	abilityId: string;
};

export const getBoardAbility = ({ board, abilityId }: Options) => {
	const { abilities = [] } = board.investigator;
	return abilities.find(whereId(abilityId));
};
