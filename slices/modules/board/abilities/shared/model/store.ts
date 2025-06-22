import type {
	BoardId,
	PropsWithBoardId,
	PropsWithSourceBoard,
} from "@modules/board/base/shared/model";
import type { PropsWithAbility } from "./";

export type AbilityUsePayload = ChangeBoardAbilityEventPayload &
	PropsWithAbility & {
		abilityTargetBoardId?: BoardId;
	};

export type ChangeBoardAbilityEventPayload = PropsWithBoardId &
	Partial<PropsWithSourceBoard>;
