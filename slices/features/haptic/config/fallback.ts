import type { HapticFeedbackType } from "@shared/model";
import type { ImpactFeedbackStyle } from "expo-haptics";
import { TICK_PATTERN } from "./vibrationPatterns";

export const fallbackVibrationDuration: Record<ImpactFeedbackStyle, number> = {
  light: 10,
  medium: 30,
  heavy: 100,
  soft: 20,
  rigid: 150,
}

type FallbackPattern<T = HapticFeedbackType> = Partial<
  Record<HapticFeedbackType, T>
>;

export const fallbackIOSPatterns: FallbackPattern = {
  clockTick: 'impactLight',
  contextClick: 'impactMedium',
  keyboardPress: 'impactLight',
  keyboardRelease: 'impactLight',
  keyboardTap: 'impactLight',
  longPress: 'impactMedium',
  virtualKey: 'impactLight',
  virtualKeyRelease: 'impactLight',
  effectClick: 'impactMedium',
  effectDoubleClick: 'impactMedium',
  effectHeavyClick: 'impactHeavy',
  effectTick: 'impactMedium'
}

export const fallbackAndroidPatterns: FallbackPattern = {
  selection: 'clockTick'
}

export const fallbackWebPatterns: FallbackPattern<VibratePattern> = {
  effectTick: TICK_PATTERN
}