import type { TouchType } from "../../../model";
import { touch } from "../actions";

type Options = {
	type?: string;
	touchType?: TouchType;
	cancelled?: boolean;
};

export const createTouchFilter = ({ touchType, cancelled, type }: Options) => {
	return (action: unknown): action is ReturnType<typeof touch> => {
		if (!touch.match(action)) {
			return false;
		}

		const { payload } = action;

		if (typeof touchType !== "undefined" && touchType !== payload.touchType) {
			return false;
		}

		if (typeof cancelled !== "undefined" && payload.canceled !== cancelled) {
			return false;
		}

		if (typeof type !== "undefined" && payload.type !== type) {
			return false;
		}

		return true;
	};
};
