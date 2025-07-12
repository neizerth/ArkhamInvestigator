import { goToPageModalActionId } from "../config";
import type { GoToPageModalAction } from "../model";

type Options = Omit<GoToPageModalAction, "type">;

export const createGoToPageModalAction = (
	options: Options,
): GoToPageModalAction => ({
	...options,
	id: goToPageModalActionId,
	type: "custom",
});
