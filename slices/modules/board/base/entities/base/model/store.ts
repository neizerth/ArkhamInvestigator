import type { IncreaseBoardValuePropPayload } from "@modules/board/base/shared/lib";

export type PropIncreasePayload = Omit<
	IncreaseBoardValuePropPayload,
	"type" | "prop"
>;
