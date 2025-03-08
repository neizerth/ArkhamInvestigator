import * as C from './Value.components';
import { StyleSheet } from 'react-native';
import { getFontStyle, numberSize, valueStyle } from './Value.styles';
import type { IconNumberProps } from '@shared/ui';

export type ValueProps = IconNumberProps;

export const Value = ({
  ...props
}: ValueProps) => {
  const { value } = props;
  const { color, fontSize } = StyleSheet.flatten(props.style);

  const fontStyle = getFontStyle({
    defaultFontSize: fontSize,
    value
  })

  const strokeStyle = {
    color
  }

  return (
    <C.Container>
      <C.Value
        {...props}
        style={[
          props.style,
          valueStyle,
          fontStyle
        ]}
        strokeStyle={[
          strokeStyle,
          props.strokeStyle,
          fontStyle
        ]}
      />
    </C.Container>
  );
}