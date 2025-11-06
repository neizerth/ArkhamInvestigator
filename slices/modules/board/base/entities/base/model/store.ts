import type { IncreaseBoardValuePropPayload } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";

export type BoardActualPropChangePayload = Omit<
	IncreaseBoardValuePropPayload,
	"type" | "prop"
> & {
	sourceBoardId?: BoardId;
};
