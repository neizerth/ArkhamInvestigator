import { StyleSheet, Text } from "react-native";
import { parseValue } from "./parseValue";
import { font } from "@shared/config";
import * as C from './IconNumber.components'
import type { IconNumberComponentProps } from "./IconNumber.types";

export const UnstrokedIconNumber = ({
  value,
  containerStyle,
  ...props
}: IconNumberComponentProps) => {
  const icons = parseValue(value);

  const { 
    fontSize = font.size.default 
  } = StyleSheet.flatten(props.style);
  
  return (
    <C.Container style={containerStyle}>
      <Text {...props}>
        {icons.map((item) => (
          <item.Component 
            {...props}
            key={item.id}
            icon={item.icon}
            size={fontSize}
          />
        ))}
      </Text>
    </C.Container>
  );
}