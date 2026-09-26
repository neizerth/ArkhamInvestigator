import { withLocale } from "@modules/core/i18n/shared/lib";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { SkillCheckExpressionDisplay } from "../../../../../../../../../../../widgets/game/skill-check";

export const Container: typeof View = styled(View)`
  
`;

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
  ${({ theme: { color } }) => css`
  color: ${color.light10};
  background-color: ${color.dark30};
  padding: 2px 5px;
  border-radius: 2px;
`}`;

const TitleText = withLocale({
	style: ({ fontFamily }) => ({
		default: {
			fontFamily: fontFamily.Copasetic.regular,
			lineHeight: 25,
			paddingVertical: 2,
			paddingHorizontal: 5,
			textAlign: "center",
		},
		ru: {
			fontFamily: fontFamily.Enthalpy298.regular,
		},
		ko: {
			fontFamily: fontFamily.LineSeedKR.regular,
			letterSpacing: -0.5,
		},
		zh: {
			fontFamily: fontFamily.ZhenShuai.regular,
			letterSpacing: 0.5,
		},
	}),
});

export const Title = styled(TitleText)`
	${({ theme: { color, font } }) => css`
		color: ${color.light10};
		font-size: ${font.size.small}px;
		background-color: ${color.dark30};
	`}
`;
