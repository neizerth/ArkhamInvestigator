import { Copasetic, Enthalpy298 } from "@assets/fonts";
import { withLocale } from "@modules/core/i18n/shared/lib";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, font, size } from "@shared/config";
import { Row as BaseRow, UnscaledText } from "@shared/ui";
import {
	CustomKeyboardButton,
	IconKeyboardButton,
	TextKeyboardButton,
} from "@widgets/control/keyboard-button";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import type { SvgProps } from "react-native-svg";
import styled, { css } from "styled-components/native";
import { skillCheckColor } from "../../../../config";
import { StatsKeyboard } from "../StatsKeyboard";
import BackspaceImage from "./images/backspace.svg";
import RuleBottom from "./images/rule.svg";

export const Container: typeof View = styled(View)`
  padding: 0 ${size.gap.default}px;
  padding-bottom: ${size.gap.default}px;  
`;

type ContentProps = ViewProps & {
	border?: boolean;
};

export const Content: FC<ContentProps> = styled(View)`
  align-items: center;
  ${({ border }: ContentProps) =>
		border &&
		css`
    border-top-width: 1px;
    border-top-color: ${skillCheckColor.border};
  `}
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  align-items: stretch;
  justify-content: center;
`;

export const StatsRow: typeof BaseRow = styled(Row)`
  width: 280px
`;

export const Back: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Col: typeof View = styled(View)`
  flex: 1;
`;

const buttonStyle = css`
  flex: 1;
`;

export const Button: typeof TextKeyboardButton = styled(TextKeyboardButton)`
  ${buttonStyle}
`;
export const CustomButton: typeof CustomKeyboardButton = styled(
	CustomKeyboardButton,
)`
  ${buttonStyle}
`;

export const Operator: typeof Button = styled(Button).attrs({
	buttonType: "primary",
})`
    ${buttonStyle}
  `;

export const Stats: typeof StatsKeyboard = styled(StatsKeyboard)`
  flex: 3;
`;

export const Backspace: typeof BackspaceImage = styled(BackspaceImage).attrs({
	width: 32,
	height: 32,
	fill: color.light10,
})`
    position: relative;
    left: -2px;
  `;

export const Placeholder: typeof View = styled(View)`
  flex: 1;
`;

export const EqualsText1: typeof UnscaledText = styled(UnscaledText)`
  color: ${color.light10};
  font-family: ${Copasetic.regular};
  font-size: ${font.size.lead}px;
`;

export const EqualsText = withLocale({
	style: {
		default: {
			fontFamily: Copasetic.regular,
			color: color.light10,
			fontSize: font.size.lead,
		},
		ru: {
			fontFamily: Enthalpy298.regular,
			marginTop: -1,
			letterSpacing: 0.5,
		},
	},
});

type RuleProps = SvgProps & {
	historyShown: boolean;
};

export const Rule: FC<RuleProps> = styled(RuleBottom).attrs({
	width: 290,
	height: 40,
})`
  ${({ historyShown }: RuleProps) =>
		historyShown &&
		css`
    transform: rotate(180deg);
  `}
  margin-bottom: -5px;
`;

export const RevealButton: typeof IconKeyboardButton = styled(
	IconKeyboardButton,
)`
  flex: 1;
`;
