import type { IncreaseBoardValuePropPayload } from "@modules/board/base/shared/lib";

export type BoardActualPropChangePayload = Omit<
	IncreaseBoardValuePropPayload,
	"type" | "prop"
>;
