import { Arkhamic, Conkordia, FZLiBian, SanCn } from "@assets/fonts";
import { withLocale } from "@modules/core/i18n/shared/lib";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Icon, Row, type UnscaledTextProps } from "@shared/ui";
import type { FC } from "react";
import { Platform, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { sectionTitleFontSize } from "../../../config";

const ios = Platform.OS === "ios";

type PropsWithOpen = {
	open?: boolean;
};

export const Container: typeof Row = styled(Row)`
	position: relative;
	align-items: center;
	padding-left: 10px;
	gap: 10px;
`;

export const Toggle: typeof TouchableOpacity = styled(TouchableOpacity)`
	padding: 10px 15px 15px 0px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	transform: translateY(${ios ? 5 : 2}px);
`;

export const ToggleIcon: typeof Icon = styled(Icon)`
	font-size: 10px;
	line-height: 10px;
	color: ${color.title};
	${
		ios &&
		css`
		transform: translateY(-2px);
	`
	}
`;

type ToggleIconContainerProps = ViewProps & PropsWithOpen;

export const ToggleIconContainer: FC<ToggleIconContainerProps> = styled(View)`
	position: relative;
	${({ open }: ToggleIconContainerProps) => css`
		transform: rotate(${open ? "90deg" : "0deg"});
	`}
`;

const zhTitleConfig = {
	fontFamily: FZLiBian.regular,
	transform: [
		{
			translateY: -sectionTitleFontSize * 0.2,
		},
	],
};

export const BaseTitle = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			fontSize: sectionTitleFontSize,
			color: color.rulesText,
		},
		ru: {
			fontFamily: Conkordia.regular,
		},
		ko: {
			fontFamily: SanCn.bold,
			paddingTop: 3,
		},
		zh: zhTitleConfig,
		"zh-cn": zhTitleConfig,
	},
});

type TitleProps = UnscaledTextProps & PropsWithOpen;

export const Title: FC<TitleProps> = styled(BaseTitle)`
	${({ open }: TitleProps) =>
		open &&
		css`
		color: ${color.title};
	`}
	${
		ios &&
		css`
		transform: translateY(-1px);
	`
	}
`;
