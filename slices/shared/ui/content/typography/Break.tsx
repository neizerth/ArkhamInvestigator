import { Text, type TextProps } from 'react-native';
export type BreakProps = TextProps

export const Break = (props: BreakProps) => {
  return (
    <Text {...props}>{'\n'}</Text>
  );
}