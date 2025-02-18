import { selectIcons, useAppSelector } from '@shared/lib';
import { Text } from './Icon.components';
import { propEq } from 'ramda';
import { StyleSheet, type TextProps } from 'react-native';

export type IconProps = TextProps & {
  icon: string
}

export const Icon = ({
  icon,
  style,
  ...props
}: IconProps) => {
  const icons = useAppSelector(selectIcons);
  const item = icons.find(propEq(icon, 'icon'));

  if (!item) {
    return null;
  }

  const ratio = item.ratio || 1;
  const contents = String.fromCharCode(item.code);
  const { fontSize } = StyleSheet.flatten(style);

  const scale = ratio > 1 ? 1 / ratio : 1;

  const scaledFontSize = fontSize && fontSize * scale;

  const fontSizeStyles = {
    fontSize: scaledFontSize,
  }
  
  return (
    <Text 
      style={[style, fontSizeStyles]}
      {...props}
    >
      {contents}
    </Text>
  );
}