import type { BaseModalAction, BaseModalData } from "../../model";
import { isBoardModalAction } from "./isBaseModalAction";

type Options<Action> = {
	id: string;
	data: BaseModalData<Action>;
};

export function getActionById<Action = unknown>({ data, id }: Options<Action>) {
	return data.actions.find((action) => {
		if (!isBoardModalAction(action)) {
			return false;
		}

		return action.id === id;
	}) as BaseModalAction;
}
