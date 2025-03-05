import * as C from './Value.components';
import { StyleSheet } from 'react-native';
import { numberSize, valueStyle } from './Value.styles';
import type { IconNumberProps } from '@shared/ui';

export type ValueProps = IconNumberProps;

export const Value = ({
  ...props
}: ValueProps) => {
  const { value } = props;
  const { color, fontSize } = StyleSheet.flatten(props.style);

  const digitsCount = value.toString().length;

  const sizeStyle = {
    fontSize: numberSize[digitsCount] || fontSize
  }

  const strokeStyle = {
    color
  }

  return (
    <C.Container
      {...props}
      style={[
        props.style,
        valueStyle,
        sizeStyle
      ]}
      strokeStyle={[
        strokeStyle,
        props.strokeStyle,
        sizeStyle
      ]}
    />
  );
}