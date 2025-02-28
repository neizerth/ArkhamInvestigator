import type { ViewProps } from 'react-native';
import * as C from './FooterDescription.components';
import { useContext, useState } from 'react';
import { LayoutContext } from '@pages/board/config';

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({
  ...props
}: FooterDescriptionProps) => {
  const [display, setDisplay] = useState(false);
  const toggle = () => setDisplay(value => !value);

  const { view } = useContext(LayoutContext);

  return (
    <C.Container 
      {...props}
    >
      <C.Content
        view={view}
        display={display}
      >
        <C.Button 
          onPress={toggle}
        >
          <C.Background 
            view={view}
          />
        </C.Button>
      </C.Content>
    </C.Container>
  );
}