import type { CustomModalAction } from "../model";

type Options<Action extends CustomModalAction> = Omit<Action, "type">;

export const createCustomModalAction = <Action extends CustomModalAction>(
	options: Options<Action>,
): CustomModalAction => ({
	...options,
	type: "custom",
});
