import { clearSelectedInvestigators, useAppDispatch } from '@shared/lib';
import * as C from './ClearButton.components';
import { useCallback } from 'react';
import type { TouchableOpacityProps } from '@shared/ui';

export type ClearButtonProps = TouchableOpacityProps

export const ClearButton = (props: ClearButtonProps) => {
  const dispatch = useAppDispatch();
  const clear = useCallback(() => {
    dispatch(clearSelectedInvestigators())
  }, [dispatch]);
  return (
    <C.Container 
      {...props}
      onPress={clear}
    >
      <C.Icon icon="dismiss"/>
    </C.Container>
  );
}