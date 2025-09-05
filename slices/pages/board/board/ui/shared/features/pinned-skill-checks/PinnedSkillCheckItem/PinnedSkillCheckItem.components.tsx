import { ArnoPro, SanCn, SourceHanSansCN, Yoon } from "@assets/fonts";
import { withLocale } from "@modules/core/i18n/shared/lib";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, font, size } from "@shared/config";
import { Row, TextView } from "@shared/ui";
import { SkillCheckExpressionDisplay } from "@widgets/game/skill-check";
import styled from "styled-components/native";

export const Item: typeof TouchableOpacity = styled(TouchableOpacity)`
  align-items: center;
	flex-direction: row;
	padding: ${size.gap.small}px;
`;

export const ItemContent: typeof Row = styled(Row)`
  align-items: center;
	gap: 2px;
`;

const zhTitleTextConfig = {
	fontFamily: SourceHanSansCN.bold,
};

const titleTextStyle = {
	default: {
		color: color.text,
		fontFamily: ArnoPro.bold,
		fontSize: font.size.default,
	},
	ko: {
		fontFamily: SanCn.bold,
	},
	zh: zhTitleTextConfig,
	"zh-cn": zhTitleTextConfig,
};

export const Title = withLocale({
	Component: TextView,
	style: titleTextStyle,
});

const zhTextConfig = {
	fontFamily: SourceHanSansCN.bold,
};

const textStyle = {
	default: {
		color: color.text,
		fontFamily: ArnoPro.regular,
		fontSize: font.size.default,
	},
	ko: {
		fontFamily: Yoon.D330.regular,
	},
	zh: zhTextConfig,
	"zh-cn": zhTextConfig,
};

export const Text = withLocale({
	Component: TextView,
	style: textStyle,
});

export const Expression: typeof SkillCheckExpressionDisplay = styled(
	SkillCheckExpressionDisplay,
)`
  
`;
