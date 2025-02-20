import { clearSelectedInvestigators, useAppDispatch } from '@shared/lib';
import * as C from './ClearButton.components';
import { useCallback } from 'react';

export type ClearButtonProps = {

}

export const ClearButton = ({}: ClearButtonProps) => {
  const dispatch = useAppDispatch();
  const clear = useCallback(
    () => dispatch(clearSelectedInvestigators()),
    []
  );
  return (
    <C.Container onPress={clear}>
      <C.Icon icon="dismiss"/>
    </C.Container>
  );
}