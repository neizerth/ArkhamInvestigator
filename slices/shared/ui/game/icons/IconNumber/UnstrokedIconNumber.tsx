import { StyleSheet, Text } from "react-native";
import { parseValue } from "./parseValue";
import { font } from "@shared/config";
import * as C from './IconNumber.components'
import type { IconNumberComponentProps } from "./IconNumber.types";
import { Single } from "@shared/model";

export const UnstrokedIconNumber = ({
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
  
  return (
    <C.Container {...containerProps}>
      {icons.map((item) => (
        <item.Component 
          {...props}
          key={item.id}
          icon={item.icon}
          size={fontSize}
          style={[
            props.style,
            getCharStyle(item)
          ]}
        />
      ))}
    </C.Container>
  );
}