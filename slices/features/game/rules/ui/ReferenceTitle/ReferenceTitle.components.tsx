import { Arkhamic, Conkordia, STXinwei, SanCn } from "@assets/fonts";
import { color } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { withLocale } from "../../../../i18n";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const UnderlineGroup: typeof View = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  gap: 1px;
`;

export const Underline: typeof View = styled(View)`
  flex: 1;
  height: 1px;
  background-color: ${color.text};
`;

export const Title = withLocale({
	style: {
		default: {
			fontFamily: Arkhamic.regular,
			textAlign: "center",
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
