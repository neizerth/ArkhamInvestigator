import type { CustomModalAction } from "../../base/model";

export type FollowURLModalAction = CustomModalAction & {
	url: string;
};
