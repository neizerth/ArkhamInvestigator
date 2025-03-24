import { selectHapticsFeedbackType } from "../../../../shared/lib/store/features/app/app"
import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector"
import type { HapticPatternType } from "@shared/model";
import { useCallback } from "react";
import { impactHapticFeedback } from "../impactHapticFeedback";

export const useHapticFeedback = (hapticStyle?: HapticPatternType) => {
  const type = useAppSelector(selectHapticsFeedbackType);
  return useCallback(() => {
    if (!type) {
      return;
    }
    const feedback = hapticStyle || type;

    console.log(feedback);
    impactHapticFeedback(feedback);
  }, [type, hapticStyle]); 
}