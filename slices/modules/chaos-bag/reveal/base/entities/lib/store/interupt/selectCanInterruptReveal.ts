import { createSelector } from "@reduxjs/toolkit";
import { interruptSelectors } from "./selectors";

export const selectCanInterruptReveal = createSelector(
	interruptSelectors,
	(...response) => {
		if (response.length === 0) {
			return false;
		}
		const interruptable = response.filter(({ canInterrupt }) => canInterrupt);
		const canInterrupt = interruptable.length > 0;

		if (!canInterrupt) {
			return false;
		}

		const codes = interruptable.map(({ code }) => code);

		return {
			canInterrupt: true,
			codes,
		};
	},
);
