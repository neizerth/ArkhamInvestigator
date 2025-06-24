import type {
	PropsWithBoardId,
	PropsWithSourceBoard,
} from "@modules/board/base/shared/model";

export type ChangeBoardAbilityEventPayload = PropsWithBoardId &
	Partial<PropsWithSourceBoard>;
