import { IconProps, Row } from '@shared/ui';
import * as C from './DescriptionMenu.components';
import type { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { useCallback, useContext } from 'react';
import { PortraitLayoutContext } from '@pages/board/config';
import { setShowDescription, useAppDispatch } from '@shared/lib';

export type DescriptionMenuProps = ViewProps

export const DescriptionMenu = (props: DescriptionMenuProps) => {
  const dispatch = useAppDispatch();
  const hide = useCallback(() => {
    dispatch(setShowDescription(false))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Button icon='typejournal'/>
      <C.Button icon='change-investigator'/>
      <C.Hide onPress={hide}/>
    </C.Container>
  );
}