export type GetIsDefeatedOptions = {
	health: number;
	sanity: number;
};

export const getIsDefeated = ({ health, sanity }: GetIsDefeatedOptions) => {
	return health <= 0 || sanity <= 0;
};
