import type { InvestigatorBoard } from "@modules/board/base/shared/model";

export const getBoardDamage = ({ value, baseValue }: InvestigatorBoard) =>
	Math.max(baseValue.health - value.health, 0);
