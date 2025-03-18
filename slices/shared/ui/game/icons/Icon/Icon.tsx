import { useAppSelector } from '../../../../lib/hooks/store/useAppSelector';
import { scaleFontFromStyle } from '../../../../lib/ui'
import { getIconScale } from '../../../../lib/features/game/icons'
import { selectIcons } from '../../../../lib/store/features/icons'
import { ArkhamIcons } from "@shared/fonts"
import type { IconScaleType, PropsWithStroke } from '@shared/model';
import { UnscaledText, type AppTextProps } from '../../../behavior/UnscaledText';
import { propEq } from 'ramda';

export type IconProps = AppTextProps & PropsWithStroke & {
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

  const fontSizeStyles = {
    fontFamily: ArkhamIcons.default,
    fontSize: scaledFontSize
  }

  return (
    <UnscaledText
      {...props}
      style={[style, fontSizeStyles]}
    >
      {contents}
    </UnscaledText>
  );
}