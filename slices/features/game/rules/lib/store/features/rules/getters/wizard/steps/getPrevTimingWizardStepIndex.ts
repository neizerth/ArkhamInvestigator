export const getPrevTimingWizardStepIndex = (index: number) => {
	if (index === 0) {
		return;
	}

	return index - 1;
};
