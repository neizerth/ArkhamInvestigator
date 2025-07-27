import type { HapticPatternType } from "@modules/core/haptic/shared/model";
import { createAction } from "@reduxjs/toolkit";
type TriggerHapticFeedbackPayload = {
	pattern?: HapticPatternType;
};

export const triggerHapticFeedback =
	createAction<TriggerHapticFeedbackPayload>("haptic/trigger");
