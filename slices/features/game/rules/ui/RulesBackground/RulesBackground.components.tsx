import { Arkhamic, Conkordia, STXinwei, SanCn } from "@assets/fonts";
import { roundReferenceAssets } from "@assets/images/game/reference/round";
import { color } from "@shared/config";
import { ImageBackground } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { withLocale } from "../../../../i18n";
import { currentRoundReferenceSize } from "../../config";

export const Container: typeof ImageBackground = styled(ImageBackground).attrs({
	source: roundReferenceAssets.background,
})`
  width: ${currentRoundReferenceSize.width}px;
  height: ${currentRoundReferenceSize.height}px;
  padding: 6% 5% 8%;
`;

export const Content: typeof View = styled(View)`
  flex: 1;
`;

export const Title: typeof View = styled(View)`
  position: absolute;
	bottom: 2.9%;
	left: 0;
	right: 0;
	align-items: center;
`;

const titleFontSize = Math.round((currentRoundReferenceSize.width * 22) / 1000);

export const TitleText = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			fontSize: titleFontSize,
			color: color.black,
			paddingLeft: titleFontSize * 1.5,
			textTransform: "uppercase",
			textAlign: "center",
		},
		ru: {
			fontSize: titleFontSize,
			fontFamily: Conkordia.regular,
			paddingLeft: titleFontSize * 1.2,
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
