import type {
	BoardId,
	ChangeBoardEventPayload,
} from "@modules/board/base/shared/model";
import type { PropsWithAbility } from "./";

export type AbilityUsePayload = ChangeBoardEventPayload &
	PropsWithAbility & {
		abilityBoardId?: BoardId;
	};
