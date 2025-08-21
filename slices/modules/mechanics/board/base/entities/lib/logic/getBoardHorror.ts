import type { InvestigatorBoard } from "@modules/board/base/shared/model";

export const getBoardHorror = ({ value, baseValue }: InvestigatorBoard) =>
	Math.max(baseValue.sanity - value.sanity, 0);
