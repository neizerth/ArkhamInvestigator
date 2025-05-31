import type { AppThunk } from "@shared/model";
import { selectChaosBagContents, setChaosBagContents } from "../../chaosBag";

export const toggleChaosTokenSeal =
	(id: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const contents = selectChaosBagContents(state);

		const data = contents.map((item) => {
			if (item.id === id) {
				return {
					...item,
					sealed: !item.sealed,
				};
			}
			return item;
		});

		dispatch(setChaosBagContents(data));
	};
