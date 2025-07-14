import type { BaseModalData } from "@modules/core/modal/shared/base/model";

export type BoardSelectModalData<Action> = BaseModalData<Action> & {
	boardIds: number[];
	text?: string;
	disabledBoardIds?: number[];
};
