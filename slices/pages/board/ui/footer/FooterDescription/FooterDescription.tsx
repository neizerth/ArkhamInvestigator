import { ViewProps } from 'react-native';
import * as C from './FooterDescription.components';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board/config';

export type FooterDescriptionProps = ViewProps;

export const FooterDescription = ({
  ...props
}: FooterDescriptionProps) => {
  const { view } = useContext(LayoutContext);

  return (
    <C.Container {...props}>
      <C.Background 
        view={view}
      />
    </C.Container>
  );
}