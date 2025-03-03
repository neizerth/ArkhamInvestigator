import { StyleSheet, TextStyle } from "react-native";
import { parseValue } from "./parseValue";
import { font } from "@shared/config";
import * as C from './IconNumber.components'
import type { CharType, IconNumberComponentProps } from "./IconNumber.types";
import type { Single } from "@shared/model";
import { fillStyle, outlineStyle } from "./IconNumber.styles";

export const StrokedIconNumber = ({
  value,
  containerProps,
  ...props
}: IconNumberComponentProps) => {
  const icons = parseValue(value);

  const { 
    fontSize = font.size.default 
  } = StyleSheet.flatten(props.style);

  return (
    <C.Container {...containerProps}>
      {icons.map((item) => (
        <C.CharContainer 
          key={item.id}
        >
          <item.Component 
            {...props}
            style={[
              props.style,
              fillStyle
            ]}
            icon={item.fill}
            size={fontSize}
          />
          <item.Component 
            {...props}
            style={[
              props.style,
              props.strokeStyle,
              outlineStyle
            ]}
            icon={item.outline}
            size={fontSize}
          />
        </C.CharContainer>
      ))}
    </C.Container>
  );
}