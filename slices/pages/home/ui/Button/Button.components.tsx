import { withLocale } from "@modules/core/i18n/shared/lib";
import type { PrimaryButtonSize } from "@shared/ui";
import type { TextProps as BaseTextProps } from "react-native";
import styled, { css } from "styled-components/native";

export const BaseText = withLocale({
	style: ({ fontFamily }) => ({
		default: {
			fontFamily: fontFamily.Arkhamic.regular,
		},
		ru: {
			fontFamily: fontFamily.TeutonicRU.regular,
		},
		ko: {
			fontFamily: fontFamily.SanCn.bold,
		},
		vi: {
			fontFamily: fontFamily.ViaodaLibre.regular,
		},
		zh: {
			fontFamily: fontFamily.FZLiBian.regular,
		},
	}),
});

const fontScale: Record<PrimaryButtonSize, number> = {
	default: 1,
	small: 0.6,
};

type TextProps = BaseTextProps & {
	size?: PrimaryButtonSize;
};

export const Text = styled(BaseText)<TextProps>`
  ${({ size = "default", theme }) => css`
    color: ${theme.color.light10};
    font-size: ${theme.font.size.xxl * fontScale[size]}px;
  `}
`;
