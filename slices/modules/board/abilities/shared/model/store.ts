import type {
	PropsWithBoardId,
	PropsWithSourceBoard,
} from "@modules/board/base/shared/model";
import type { ChangeHistoryPayload } from "@modules/board/history/shared/model";

export type ChangeBoardAbilityEventPayload = PropsWithBoardId &
	Partial<PropsWithSourceBoard> &
	ChangeHistoryPayload;
