import { Text, type TextProps } from 'react-native';
import { parseValue } from './parseValue';
import { StyleSheet } from 'react-native';
import { font } from '@shared/config';

export type IconNumberProps = TextProps & {
  value: number | string
  stroke?: boolean
}

export const IconNumber = ({
  value,
  stroke,
  ...props
}: IconNumberProps) => {
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