import { Arkhamic, ArnoPro, Conkordia, STXinwei, SanCn } from "@assets/fonts";
import { scenarioReferenceImage } from "@assets/images/game/reference";
import { withLocale } from "@features/i18n";
import { color, size } from "@shared/config";
import { Icon, ImageBackground } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { currentScenarioReferenceSize as refSize } from "../../config";
import { refUnit as unit, refPx as upx } from "../../lib";
import { ScenarioReferenceEffects } from "../ScenarioReferenceEffects";

export const Container: typeof ImageBackground = styled(ImageBackground).attrs({
	source: scenarioReferenceImage,
	imageStyle: {
		borderRadius: size.borderRadius.large,
	},
})`
	position: relative;
  width: ${refSize.width}px;
	height: ${refSize.height}px;
`;

export const Content: typeof View = styled(View)`
  position: absolute;
	padding: 0 ${upx(10)};
	gap: ${upx(3)};
	left: 0;
	right: 0;
	bottom: ${upx(20)};
`;

export const Header: typeof View = styled(View)`
	align-items: center;
`;

export const TitleGroup: typeof View = styled(View)`
	position: relative;
`;

export const TitleUnderlineGroup: typeof View = styled(View)`
  position: absolute;
	left: 0;
	right: 0;
	gap: ${upx(1)};
`;

export const TitleUnderline: typeof View = styled(View)`
	flex: 1;
	height: 1px;
	background-color: ${color.text};
`;

export const TitleText = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
		},
		ru: {
			fontFamily: Conkordia.regular,
		},
		ko: {
			fontFamily: SanCn.bold,
		},
		zh: {
			fontFamily: STXinwei.regular,
		},
		"zh-cn": {
			fontFamily: STXinwei.regular,
		},
	},
});

export const Difficulty: typeof View = styled(View)`
	align-items: center;
`;

export const DifficultyText = withLocale({
	style: {
		default: {
			fontFamily: ArnoPro.bold,
			fontSize: unit(3.2),
		},
		ko: {
			fontFamily: SanCn.bold,
		},
		zh: {
			fontFamily: STXinwei.regular,
		},
		"zh-cn": {
			fontFamily: STXinwei.regular,
		},
	},
});

export const ReferenceIcon: typeof Icon = styled(Icon)`
  position: absolute;
	color: ${color.text};
	left: 50%;
	top: ${upx(11.5)};
	font-size: ${upx(8)};
	margin-left: ${upx(-3)};
	width: ${upx(6)};;
	text-align: center;
`;

export const Tokens: typeof ScenarioReferenceEffects = styled(
	ScenarioReferenceEffects,
)`
	align-items: center;
`;
