
import { getOrientationType } from '@shared/lib/device';
import type { Orientation } from '@shared/model';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();

  useEffect(() => {
    ScreenOrientation
      .getOrientationAsync()
      .then(setOrientation)
    
    const subscription = ScreenOrientation
      .addOrientationChangeListener(({ orientationInfo }) => {
        setOrientation(orientationInfo.orientation);
      });
      

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    }
  }, [])

  const type = getOrientationType(orientation); 

  return {
    orientation,
    type
  };
}