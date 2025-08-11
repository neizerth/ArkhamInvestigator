import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type {
	ChaosBagToken,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";

export type InvestigatorTokenValueModificationCallbackOptions =
	PropsWithBoard & {
		chaosBagContents: ChaosBagToken[];
		revealedIds: string[];
	};

export type InvestigatorTokenValueModificationCallback = (
	options: InvestigatorTokenValueModificationCallbackOptions,
) => ChaosTokenValues;

export type InvestigatorTokenValueModification = Record<
	string,
	InvestigatorTokenValueModificationCallback
>;
