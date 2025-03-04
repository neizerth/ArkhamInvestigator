import { IconProps, Row } from '@shared/ui';
import * as C from './DescriptionMenu.components';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { useCallback, useContext } from 'react';
import { PortraitLayoutContext } from '@pages/board/config';

export type DescriptionMenuProps = ViewProps

export const DescriptionMenu = (props: DescriptionMenuProps) => {
  const { setShowDescription } = useContext(PortraitLayoutContext);
  const hide = useCallback(() => {
    setShowDescription(false)
  }, [setShowDescription]);

  return (
    <C.Container {...props}>
      <C.Left>
        <C.Button icon='typejournal'/>
        <C.Button icon='change-investigator'/>
        <C.Clear/>
      </C.Left>
      <C.Hide onPress={hide}/>
    </C.Container>
  );
}