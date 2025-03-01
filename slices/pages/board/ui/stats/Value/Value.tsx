import type { IconNumberProps } from '@shared/ui';
import * as C from './Value.components';
import { StyleSheet } from 'react-native';
import { valueStyle } from './Value.styles';

export type ValueProps = IconNumberProps;

export const Value = ({
  ...props
}: ValueProps) => {
  

  return (
    <C.Container
      // stroke
      {...props}
      style={[
        props.style,
        valueStyle
      ]}
      // backgroundStyle={[
      //   props.backgroundStyle,
      //   backgroundStyle
      // ]}
    />
  );
}