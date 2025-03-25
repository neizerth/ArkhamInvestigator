import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector"
import { useCallback } from "react";
import { impactHapticFeedback } from "../impactHapticFeedback";
import { selectHapticMode } from "../store/features/haptic/haptic";
import type { HapticPatternType } from "../../model";
import { defaultModeFeedback } from "@features/haptic/config";


export const useHapticFeedback = (hapticPattern?: HapticPatternType) => {
  const mode = useAppSelector(selectHapticMode);
  return useCallback((currentPattern?: HapticPatternType) => {
    if (!mode) {
      return;
    }
    const defaultFeedback = defaultModeFeedback[mode];
    const feedback = currentPattern || hapticPattern || defaultFeedback;

    impactHapticFeedback(feedback);
  }, [mode, hapticPattern]); 
}