import { SanCn, TeutonicRU, ViaodaLibre } from "@assets/fonts";
import { Arkhamic, STXingkai } from "@assets/fonts";
import type {
	PrimaryButtonProps,
	PrimaryButtonSize,
} from "@modules/haptic/shared/ui";
import { withLocale } from "@modules/i18n/shared/lib";
import { color, font } from "@shared/config";
import type { FC } from "react";
import type { TextProps as BaseTextProps } from "react-native";
import styled, { css } from "styled-components/native";

const zhText = {
	fontFamily: STXingkai.regular,
};

export const BaseText = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			color: color.light10,
		},
		ru: {
			fontFamily: TeutonicRU.regular,
		},
		ko: {
			fontFamily: SanCn.bold,
		},
		vi: {
			fontFamily: ViaodaLibre.regular,
		},
		zh: zhText,
		"zh-cn": zhText,
	},
});

const fontScale: Record<PrimaryButtonSize, number> = {
	default: 1,
	small: 0.6,
};

type TextProps = BaseTextProps & {
	size?: PrimaryButtonSize;
};

export const Text: FC<TextProps> = styled(BaseText)`
  ${({ size = "default" }: PrimaryButtonProps) => css`
    font-size: ${font.size.xxl * fontScale[size]}px;
  `}
`;
