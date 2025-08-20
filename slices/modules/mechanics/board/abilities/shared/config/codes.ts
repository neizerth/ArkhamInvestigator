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
	PrestonFairmont: {
		familyInheritance: "family-inheritance",
		elderSign: "pay-to-auto-success",
	},
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
	DanielaReyes: "been-attacked",
	KymaniJones: "exhausted-enemy",
};

export const LilyChenAbilityCodes = Object.values(AbilityCode.LilyChen);

export const specialAbilitityCodes = [
	AbilityCode.CarsonSinclair,
	AbilityCode.ZoeySamaras,
	AbilityCode.MinhThiPhan,
	AbilityCode.WendyAdams,
	AbilityCode.DanielaReyes,
	AbilityCode.PrestonFairmont.elderSign,
	...LilyChenAbilityCodes,
];

export const hiddenAbilityCodes = [AbilityCode.PrestonFairmont.elderSign];

export const checkAbilityCodes = [
	AbilityCode.DanielaReyes,
	AbilityCode.KymaniJones,
	...LilyChenAbilityCodes,
];
