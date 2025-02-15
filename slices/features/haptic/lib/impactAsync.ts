import * as Haptics from 'expo-haptics';
import {Platform} from 'react-native';
import { fallbackVibrationDuration } from '../config/fallbackVibration';

export const impactAsync = (style = Haptics.ImpactFeedbackStyle.Light) => {
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(style);
    return;
  }
  
  if ('vibrate' in navigator) {
    const duration = fallbackVibrationDuration[style];
    navigator.vibrate(duration);
  }
} 