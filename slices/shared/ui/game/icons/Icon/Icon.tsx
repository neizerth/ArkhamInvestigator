import { scaleFontFromStyle, selectIcons, useAppSelector } from '@shared/lib';
import { propEq } from 'ramda';
import { StyleSheet, type TextProps } from 'react-native';
import { getIconScale } from './getIconScale';
import { Text } from 'react-native';
import { ArkhamIcons } from '@shared/fonts/ArkhamIcons';

export type IconScaleType = 'fixedHeight' | 'maxHeight' | 'circle' | 'auto';

export type IconProps = TextProps & {
  icon: string
  scaleType?: IconScaleType
}

export type DefinedIconProps = Omit<IconProps, 'icon'>

export const Icon = ({
  icon,
  style,
  scaleType,
  ...props
}: IconProps) => {
  const icons = useAppSelector(selectIcons);
  const item = icons.find(propEq(icon, 'icon'));

  if (!item) {
    return null;
  }

  const contents = String.fromCharCode(item.code);

  const scale = getIconScale(item, scaleType);

  const { fontSize, scaledFontSize } = scaleFontFromStyle(scale, style);

  const fontSizeStyles = {
    fontFamily: ArkhamIcons.default,
    fontSize: scaledFontSize
  }
  return (
    <Text
      {...props}
      style={[style, fontSizeStyles]}
    >
      {contents}
    </Text>
  );
}