import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";

export type InvestigatorTokenValueModificationCallback = () => Partial<
	Record<ChaosTokenType, number>
>;

export type InvestigatorTokenValueModification = Record<
	string,
	InvestigatorTokenValueModificationCallback
>;
