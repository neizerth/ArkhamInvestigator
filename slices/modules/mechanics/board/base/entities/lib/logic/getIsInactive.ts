export type GetIsInactiveOptions = {
	isDefeated: boolean;
	isTurnEnd: boolean;
};
export const getIsInactive = ({
	isTurnEnd,
	isDefeated,
}: GetIsInactiveOptions) => {
	return isTurnEnd || isDefeated;
};
