import { font } from "@shared/config";
import { StyleSheet, Text, TextProps } from "react-native";
import { parseValue } from "./parseValue";

export type IconNumberTextProps = TextProps & {
  value: number | string
  stroke?: boolean
}

export const IconNumberText = ({
  value,
  stroke,
  ...props
}: IconNumberTextProps) => {
  const icons = parseValue(value);

  const { 
    fontSize = font.size.default 
  } = StyleSheet.flatten(props.style);
  
  return (
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
  );
}