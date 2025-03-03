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


  const getCharStyle = (item: Single<typeof icons>) => {
    const k = item.fontSize || 1;

    return {
      fontSize: k * fontSize
    }
  }

  const getContainerStyle  = ({ margin }: Single<typeof icons>) => {
    const { left, right, top = 0 } = margin;
    const style = {
      marginTop: top * fontSize,
    }
    if (icons.length < 2) {
      return style
    }
    return {
      ...style,
      marginLeft: left * fontSize,
      marginRight: right * fontSize
    }
  }

  const correctionStyle = {
    top: -fontSize * 0.1
  };
  
  return (
    <C.Container {...containerProps}>
      {icons.map((item) => (
        <C.CharContainer 
          key={item.id} 
          style={getContainerStyle(item)}
        >
          <item.Component 
            {...props}
            style={[
              props.style,
              getCharStyle(item),
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
              getCharStyle(item),
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