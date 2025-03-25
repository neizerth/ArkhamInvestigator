import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector"
import { useCallback } from "react";
import { impactHapticFeedback } from "../impactHapticFeedback";
import { selectDeafultHapticType } from "../store/features/haptic/haptic";
import type { HapticPatternType } from "../../model";

export const useHapticFeedback = (hapticPattern?: HapticPatternType) => {
  const defaultHapticPattern = useAppSelector(selectDeafultHapticType);
  return useCallback(() => {
    if (!defaultHapticPattern) {
      return;
    }
    const feedback = hapticPattern || defaultHapticPattern;

    impactHapticFeedback(feedback);
  }, [defaultHapticPattern, hapticPattern]); 
}