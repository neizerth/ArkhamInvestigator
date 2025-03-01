import { StyleSheet, TextStyle } from "react-native";
import { parseValue } from "./parseValue";
import { font } from "@shared/config";
import * as C from './IconNumber.components'
import type { CharType, IconNumberComponentProps } from "./IconNumber.types";
import type { Single } from "@shared/model";

export const StrokedIconNumber = ({
  value,
  containerStyle,
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
  
  return (
    <C.Container style={containerStyle}>
      {icons.map((item) => (
        <C.CharContainer 
          key={item.id} 
          style={getContainerStyle(item)}
        >
          <C.CharNumber>
            <item.Component 
              {...props}
              style={[
                props.style,
                getCharStyle(item)
              ]}
              icon={`${item.icon}-fill`}
              size={fontSize}
            />
          </C.CharNumber>
          <C.Outline>
            <item.Component 
              {...props}
              style={[
                props.style,
                props.strokeStyle,
                getCharStyle(item)
              ]}
              icon={`${item.icon}-outline`}
              size={fontSize}
            />
          </C.Outline>
        </C.CharContainer>
      ))}
    </C.Container>
  );
}