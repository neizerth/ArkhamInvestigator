import { getIconScale, scaleFontFromStyle, selectIcons, useAppSelector } from '@shared/lib';
import { propEq } from 'ramda';
import { StyleSheet, type TextProps } from 'react-native';
import { Text } from 'react-native';
import { ArkhamIcons } from '@shared/fonts/ArkhamIcons';
// import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import type { IconScaleType, PropsWithStroke } from '@shared/model';

export type IconProps = TextProps & PropsWithStroke & {
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

  const { scaledFontSize } = scaleFontFromStyle(scale, style);
  const { color } = StyleSheet.flatten(style);

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

  // if (!stroke) {
  //   return (
  //     <Text
  //       {...props}
  //       style={[style, fontSizeStyles]}
  //     >
  //       {contents}
  //     </Text>
  //   );
  // }

  // return (
  //   <StrokeText
  //     {...fontSizeStyles}
  //     text={contents}
  //     strokeColor={strokeColor}
  //     strokeWidth={strokeWidth}
  //     color={color?.toString()}
  //   />
  // )
}