import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

export type ChaosTokenType =
	| BaseChaosTokenType
	| SpecialChaosTokenType
	| CustomChaosTokenType
	| "custom";

export type BaseChaosTokenType =
	| NumericChaosTokenType
	| BaseSymbolicChaosTokenType
	| SpecialSymbolicChaosTokenType;

export type CustomChaosTokenType = "moon";

export type NumericChaosTokenType =
	| "+1"
	| "0"
	| "-1"
	| "-2"
	| "-3"
	| "-4"
	| "-5"
	| "-6"
	| "-7"
	| "-8";

export type SymbolicChaosTokenType =
	| BaseSymbolicChaosTokenType
	| SpecialSymbolicChaosTokenType
	| SpecialChaosTokenType;

export type BaseSymbolicChaosTokenType =
	| "skull"
	| "cultist"
	| "tablet"
	| "elderThing";

export type SpecialSymbolicChaosTokenType = "elderSign" | "autoFail";

export type SpecialChaosTokenType = BlessCurseChaosTokenType | FrostTokenType;

export type FrostTokenType = "frost";

export type BlessCurseChaosTokenType = "bless" | "curse";

export type ChaosTokenCount = Partial<Record<ChaosTokenType, number>>;

export type ChaosBagTokenData = {
	revealPriority?: number;
	sealed?: boolean;
	sealData?: ChaosBagTokenSealData | null;
	afterReveal?: {
		type: "return";
		count: number;
	};
} & (
	| {
			type: ChaosTokenType;
	  }
	| {
			type: "custom";
	  }
);

export type ChaosBagTokenSealData = {
	title?: string;
	icon?: string;
} & (
	| {
			type: "investigator";
			boardId: number;
	  }
	| {
			type: "enemy";
			code?: string;
	  }
);

export type ChaosBagToken = ChaosBagTokenData & {
	id: string;
};

export type ChaosTokenValues = Partial<Record<ChaosTokenType, ChaosTokenValue>>;
