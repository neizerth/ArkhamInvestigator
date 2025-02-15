import type { ImpactFeedbackStyle } from "expo-haptics";

export const fallbackVibrationDuration: Record<ImpactFeedbackStyle, number> = {
  light: 10,
  medium: 30,
  heavy: 100,
  soft: 20,
  rigid: 150,
}