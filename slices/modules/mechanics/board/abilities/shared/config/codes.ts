export const AbilityCode = {
	ShatteredSelf: "shattered-self-cards",
	SisterMary: "mary-add-bless",
	GeorgeBarnaby: "george-cards",
	DianaStanley: {
		counter: "diana-cards",
		reaction: "diana-reaction",
	},
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
	RexMurphy: {
		base: "auto-fail-for-3-cards",
	},

	StellaClark: {
		reaction: "stella-fail-test-reaction",
		elderSign: "autofail-to-heal-horror-and-damage",
	},
	SkidsOToole: {
		base: {
			fast: "two-resources-for-action",
		},
	},
	AliceLiddell: "use-base-intellect",
	ReynauldDeChatillon: "reynauld-reaction",
	RolandBanks: "clue-after-enemy-defeat",
};

export const LilyChenAbilityCodes = Object.values(AbilityCode.LilyChen);

export const specialAbilitityCodes = [
	AbilityCode.CarsonSinclair,
	AbilityCode.ZoeySamaras,
	AbilityCode.MinhThiPhan,
	AbilityCode.WendyAdams,
	AbilityCode.DanielaReyes,
	AbilityCode.PrestonFairmont.elderSign,
	AbilityCode.RexMurphy.base,
	AbilityCode.StellaClark.elderSign,
	AbilityCode.KohakuNarukami,
	...LilyChenAbilityCodes,
];

export const hiddenAbilityCodes = [
	AbilityCode.PrestonFairmont.elderSign,
	AbilityCode.RexMurphy.base,
	AbilityCode.StellaClark.elderSign,
];

export const checkAbilityCodes = [
	AbilityCode.DanielaReyes,
	AbilityCode.KymaniJones,
	...LilyChenAbilityCodes,
];

export const specialCounterAbilityCodes = [
	AbilityCode.PrestonFairmont.familyInheritance,
];
