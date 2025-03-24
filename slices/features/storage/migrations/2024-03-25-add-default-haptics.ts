import type { IAppState, IBoardState, RootState } from "@shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	app?: IAppState;
};

export default function v1(state?: State) {
	if (!state?.app) {
		return;
	}

	return {
		...state,
		app: {
			...state.app,
			hapticsFeedbackType: 'clockTick'
		}
	};
}
