export type InvestigatorBoardUsedAbility = {
	id: string;
	boardIds?: number[];
};

export type InvestigatorAbilityValues = Record<string, number>;

export type PropsWithAbility = {
	abilityId: string;
};
