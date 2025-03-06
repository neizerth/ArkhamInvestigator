import { router } from 'expo-router';

import * as C from './PrimaryButton.components';
import { useCallback, useState } from 'react';
import { CLICK_PATTERN } from '@features/haptic';
import { PrimaryButtonProps } from './PrimaryButton.types';

export const PrimaryButton = ({
  children,
  styleType,
  ...props
}: PrimaryButtonProps) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);

  return (
    <C.Container 
      pressHapticPattern={CLICK_PATTERN}
      {...props}
    >
      <C.Background 
        onLoad={onLoad} 
        styleType={styleType}
      >
        {loaded && children}
      </C.Background>
    </C.Container>
  );
}