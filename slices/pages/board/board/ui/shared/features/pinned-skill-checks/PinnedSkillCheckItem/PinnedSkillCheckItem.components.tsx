import { ArnoPro, STXinwei, SanCn, Yoon } from "@assets/fonts";
import { TouchableOpacity } from "@features/haptic";
import { withLocale } from "@features/i18n";
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
	fontFamily: STXinwei.regular,
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
	fontFamily: STXinwei.regular,
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
