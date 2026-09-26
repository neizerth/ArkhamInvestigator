import { withLocale } from "@modules/core/i18n/shared/lib";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Row, TextView } from "@shared/ui";
import { SkillCheckExpressionDisplay } from "@widgets/game/skill-check";
import styled, { css } from "styled-components/native";

export const Item: typeof TouchableOpacity = styled(TouchableOpacity)`
  align-items: center;
	flex-direction: row;
	padding: ${({ theme }) => theme.size.gap.small}px;
`;

export const ItemContent: typeof Row = styled(Row)`
  align-items: center;
	gap: 2px;
`;

const TitleText = withLocale({
	Component: TextView,
	style: ({ fontFamily }) => ({
		default: {
			fontFamily: fontFamily.CrimsonPro.bold,
		},
		ru: {
			fontFamily: fontFamily.EBGaramond.bold,
		},
		ko: {
			fontFamily: fontFamily.SanCn.bold,
		},
		zh: {
			fontFamily: fontFamily.SourceHanSansCN.bold,
		},
	}),
});

export const Title = styled(TitleText)`
	${({ theme: { color, font } }) => css`
		color: ${color.text};
		font-size: ${font.size.default}px;
	`}
`;

const TextBase = withLocale({
	Component: TextView,
	style: ({ fontFamily }) => ({
		default: {
			fontFamily: fontFamily.CrimsonPro.regular,
		},
		ru: {
			fontFamily: fontFamily.EBGaramond.regular,
		},
		ko: {
			fontFamily: fontFamily.Yoon.D330.regular,
		},
		zh: {
			fontFamily: fontFamily.SourceHanSansCN.bold,
		},
	}),
});

export const Text = styled(TextBase)`
	${({ theme: { color, font } }) => css`
		color: ${color.text};
		font-size: ${font.size.default}px;
	`}
`;

export const Expression: typeof SkillCheckExpressionDisplay = styled(
	SkillCheckExpressionDisplay,
)`
  
`;
