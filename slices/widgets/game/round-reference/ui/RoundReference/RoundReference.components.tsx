import { Arkhamic, Conkordia, STXinwei, SanCn } from "@assets/fonts";
import { roundReferenceAssets } from "@assets/images/game/reference/round";
import { withLocale } from "@features/i18n";
import { ImageBackground } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { currentRoundReferenceSize } from "../../config";
import { unit } from "../../lib";

export const Container: typeof ImageBackground = styled(ImageBackground).attrs({
	source: roundReferenceAssets.background,
})`
  width: ${currentRoundReferenceSize.width}px;
  height: ${currentRoundReferenceSize.height}px;
  padding: 7% 8% 8%;
`;

export const Phase: typeof ImageBackground = styled(ImageBackground).attrs({
	source: roundReferenceAssets.phaseBackground,
})`
  flex: 1;
  padding: 10px;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
`;

export const Title: typeof View = styled(View)`
  align-items: center;
`;

export const TitleText = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			textAlign: "center",
			fontSize: unit(5),
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
