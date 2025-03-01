import * as C from './Value.components';
import { StyleSheet } from 'react-native';
import { valueStyle } from './Value.styles';
import type { IconNumberProps } from '@shared/ui';

export type ValueProps = IconNumberProps;

export const Value = ({
  ...props
}: ValueProps) => {
  const { color } = StyleSheet.flatten(props.style);

  const strokeStyle = {
    color
  }

  return (
    <C.Container
      {...props}
      style={[
        props.style,
        valueStyle
      ]}
      strokeStyle={[
        strokeStyle,
        props.strokeStyle
      ]}
    />
  );
}