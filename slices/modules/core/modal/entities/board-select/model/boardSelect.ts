import type { BaseModalData } from "@modules/core/modal/shared/base/model";
import type { InvestigatorDetailItem } from "@shared/model";

export type BoardSelectModalData<Action> = BaseModalData<Action> & {
	data: InvestigatorDetailItem<number>[];
	text?: string;
	selectedId?: string;
	disabledIds?: string[];
};
