import type { HapticMode } from "@shared/model";
import type { HapticPatternType } from "../model";

type Mode = Exclude<HapticMode, false>;
export const defaultModeFeedback: Record<Mode, HapticPatternType> = {
	system: "effectTick",
	default: "clockTick",
};
