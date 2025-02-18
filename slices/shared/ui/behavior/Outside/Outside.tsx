import { Pressable, StyleSheet, type PressableProps } from 'react-native';

export const Outside = (props: PressableProps) => {
  return (
    <Pressable
      style={StyleSheet.absoluteFill}
      {...props}  
    />
  );
}