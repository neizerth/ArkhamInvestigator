import { ArnoPro, STXinwei, SanCn } from "@assets/fonts";
import { scenarioReferenceImage } from "@assets/images/game/reference";
import { withLocale } from "@features/i18n";
import { color, size } from "@shared/config";
import { Icon, ImageBackground } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { ReferenceTitle } from "../../../reference-title";
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
	padding: 0 ${upx(9)};
	gap: ${upx(3)};
	left: 0;
	right: 0;
	bottom: ${upx(20)};
`;

export const Header: typeof View = styled(View)`
	align-items: center;
`;

export const Title: typeof ReferenceTitle = styled(ReferenceTitle)`
	
`;

export const Difficulty: typeof View = styled(View)`
	align-items: center;
`;

export const DifficultyText = withLocale({
	style: {
		default: {
			fontFamily: ArnoPro.bold,
			fontSize: unit(3.3),
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

export const ReferenceIconContainer: typeof View = styled(View)`
  position: absolute;
	top: ${upx(16)};
	left: 0;
	right: 0;
	align-items: center;
	justify-content: center;
	height: ${upx(7)};
`;

export const ReferenceIcon: typeof Icon = styled(Icon)`
	color: ${color.text};
	font-size: ${upx(7)};
	line-height: ${upx(6)};
`;

export const Body: typeof View = styled(View)`
	flex: 1;
`;

export const Tokens: typeof ScenarioReferenceEffects = styled(
	ScenarioReferenceEffects,
)`
	align-items: center;
`;
