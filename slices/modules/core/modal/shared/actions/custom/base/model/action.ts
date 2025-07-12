import type { BaseModalAction } from "@modules/core/modal/shared/base/model";

export type CustomModalAction = BaseModalAction & {
	type: "custom";
};
