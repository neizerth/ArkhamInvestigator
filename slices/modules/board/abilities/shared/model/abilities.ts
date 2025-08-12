export type InvestigatorBoardUsedAbility = {
	id: string;
	boardIds?: number[];
	active?: boolean;
};

export type InvestigatorAbilityValues = Record<string, number>;

export type PropsWithAbility = {
	abilityId: string;
};
