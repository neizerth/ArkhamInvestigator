import { followURLModalActionId } from "../config/action";
import type { FollowURLModalAction } from "../model";

type Options = Omit<FollowURLModalAction, "id" | "type"> & {
	url: string;
};

export const createFollowURLModalAction = (
	options: Options,
): FollowURLModalAction => ({
	...options,
	type: "custom",
	id: followURLModalActionId,
});
