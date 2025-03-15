import type * as ScreenOrientation from 'expo-screen-orientation';
import type { DeviceOrientation } from '../../../model';
import { orientations } from '../../../config';

type OrientationType = DeviceOrientation | 'default';

export const getOrientationType = (orientation?: ScreenOrientation.Orientation): OrientationType => {
  if (!orientation) {
    return 'default';
  }
  if (orientations.landscape.includes(orientation)) {
    return 'landscape'
  }
  if (orientations.portrait.includes(orientation)) {
    return 'portrait';
  }
  return 'default';
}