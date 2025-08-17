export const AbilityCode = {
	ShatteredSelf: "shattered-self-cards",
	SisterMary: "add-2-bless",
	GeorgeBarnaby: "george-cards",
	DianaStanley: "diana-cards",
	LilyChen: {
		willpower: "alignment-of-spirit",
		intellect: "quiescence-of-thought",
		combat: "prescience-of-fate",
		agility: "balance-of-body",
	},
	LolaHayes: "role-switch",
	Subject5U21: "ravenous",
	GloriaGoldberg: "gloria-cards",
	PrestonFairmont: "family-inheritance",
	TonyMorgan: "bounty-contracts",
	CarsonSinclair: "give-action",
	MinhThiPhan: "add-2wild",
	KohakuNarukami: "bless-curse",

	ZoeySamaras: {
		parallel: {
			fast: "remove-3-bless",
			reaction: "add-bless",
		},
		base: "get-resource",
	},
	FatherMateo: {
		base: "mateo-auto-fail-reveal",
	},
	WendyAdams: "wendys-amulet",
};

export const specialAbilitityCodes = [
	AbilityCode.CarsonSinclair,
	AbilityCode.ZoeySamaras,
	AbilityCode.MinhThiPhan,
	AbilityCode.WendyAdams,
	...Object.values(AbilityCode.LilyChen),
];
