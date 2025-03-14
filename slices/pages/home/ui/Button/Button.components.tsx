import { withLocale } from "@features/i18n";
import { color, font } from "@shared/config";
import { SanCn, TeutonicRU, ViaodaLibre } from "@shared/fonts"
import { STXingkai, Arkhamic } from "@shared/fonts"
import { PrimaryButtonProps, PrimaryButtonSize } from "@shared/ui";
import { FC } from "react";
import { TextProps as BaseTextProps } from "react-native";
import styled, { css } from "styled-components/native";

const zhText = {
  fontFamily: STXingkai.regular
}

export const BaseText = withLocale({
  style: {
    default: {
      fontFamily: Arkhamic.regular,
      color: color.light10
    },
    ru: {
      fontFamily: TeutonicRU.regular
    },
    ko: {
      fontFamily: SanCn.bold
    },
    vi: {
      fontFamily: ViaodaLibre.regular
    },
    zh: zhText,
    "zh-cn": zhText
  }
})

const fontScale: Record<PrimaryButtonSize, number> = {
  default: 1,
  small: 0.6
}

type TextProps = BaseTextProps & {
  size?: PrimaryButtonSize
} 

export const Text: FC<TextProps> = styled(BaseText)`
  ${({ size = 'default' }: PrimaryButtonProps) => css`
    font-size: ${font.size.xxl * fontScale[size]}px;
  `}
` 