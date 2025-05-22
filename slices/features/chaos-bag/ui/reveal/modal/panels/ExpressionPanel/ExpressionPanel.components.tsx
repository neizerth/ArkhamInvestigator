import { Copasetic, Enthalpy298, LineSeedKR, ZhenShuai } from "@assets/fonts";
import { color, font } from "@shared/config";
import { Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { SkillCheckExpressionDisplay } from "../../../../../../../widgets/game/skill-check";
import { TouchableOpacity } from "../../../../../../haptic";
import { withLocale } from "../../../../../../i18n";

const { width } = Dimensions.get("screen");

export const Container: typeof View = styled(View)`
  
`;

const zhTextConfig = {
	fontFamily: ZhenShuai.regular,
	letterSpacing: 0.5,
};

export const Content: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  bottom: 0;
  left: -50%;
  right: -50%;
  align-items: center;
`;

export const Expression: typeof SkillCheckExpressionDisplay = styled(
	SkillCheckExpressionDisplay,
)`
  color: ${color.light10};
  background-color: ${color.dark30};
  padding: 2px 5px;
  border-radius: 2px;
`;

export const Title = withLocale({
	style: {
		default: {
			fontFamily: Copasetic.regular,
			lineHeight: 25,
			color: color.light10,
			fontSize: font.size.small,
			paddingVertical: 2,
			paddingHorizontal: 5,
			backgroundColor: color.dark30,
			textAlign: "center",
		},
		ru: {
			fontFamily: Enthalpy298.regular,
		},
		ko: {
			fontFamily: LineSeedKR.regular,
			letterSpacing: -0.5,
		},
		zh: zhTextConfig,
		"zh-cn": zhTextConfig,
	},
});
