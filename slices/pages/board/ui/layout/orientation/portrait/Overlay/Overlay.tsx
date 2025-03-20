import { StyleSheet, ViewProps } from 'react-native';
import * as C from './Overlay.components';
import { selectShowDescription, setShowAdditionalInformation, setShowDescription, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback } from 'react';
import { useOverlayStyle } from './useOverlayStyle';
import { impactHapticFeedback } from '@features/haptic';

export type OverlayProps = ViewProps

export const Overlay = (props: OverlayProps) => {
  const dispatch = useAppDispatch();
  const showDescription = useAppSelector(selectShowDescription);

  const style = useOverlayStyle()

  const hideDescription = useCallback(() => {
    dispatch(setShowDescription(false));
  }, [dispatch]);

  const setDisplayInfo = useCallback((show: boolean) => () => {
    if (showDescription) {
      return;
    }
    if (show) {
      impactHapticFeedback('effectClick');
    }
    dispatch(setShowAdditionalInformation(show))
  }, [dispatch, showDescription]);

  return (
    <C.Container 
      {...props}
      style={[
        props.style,
        style
      ]}
    >
      <C.Area 
        style={StyleSheet.absoluteFill}
        onPress={hideDescription}
        onPressIn={setDisplayInfo(true)}
        onPressOut={setDisplayInfo(false)}
      />
    </C.Container>
  );
}