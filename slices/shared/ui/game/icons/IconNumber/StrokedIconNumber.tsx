import { StyleSheet, TextStyle } from "react-native";
import { font } from "@shared/config";
import * as C from './IconNumber.components'
import type { IconNumberComponentProps } from "./IconNumber.types";
export const StrokedIconNumber = ({
  value,
  containerProps,
  ...props
}: IconNumberComponentProps) => {

  const { 
    fontSize = font.size.default 
  } = StyleSheet.flatten(props.style);

  const strokeStyle = [
    props.style,
    props.strokeStyle,
    { fontSize }
  ]

  return (
    <C.Container {...containerProps}>
      <C.StrokeContainer>
        <C.Fill {...props}>{value}</C.Fill>
        <C.Outline 
          {...props}
          style={strokeStyle}
        >
          {value}
        </C.Outline>
      </C.StrokeContainer>
    </C.Container>
  );
}