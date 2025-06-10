import { Arkhamic, Conkordia, STXinwei, SanCn } from "@assets/fonts";
import { withLocale } from "@features/i18n";
import { TouchableOpacity } from "@modules/haptic/widgets";
import { color } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { phaseTitleFontSize } from "../../../config";
import { RoundReferenceBackground } from "../../RoundReferenceBackground";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
`;

export const Content: typeof View = styled(View)`
  position: relative;
`;

export const Wrapper: typeof Row = styled(Row)`
	justify-content: space-between;
	align-items: center;
  position: relative;
	z-index: 1;
	padding: 10px 25px 15px;
`;

export const Background: typeof RoundReferenceBackground = styled(
	RoundReferenceBackground,
)`
  position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0%;
`;

export const Title = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			fontSize: phaseTitleFontSize,
			color: color.rulesText,
		},
		ru: {
			fontFamily: Conkordia.regular,
		},
		ko: {
			fontFamily: SanCn.bold,
			paddingTop: 3,
		},
		zh: {
			fontFamily: STXinwei.regular,
		},
		"zh-cn": {
			fontFamily: STXinwei.regular,
		},
	},
});
