import { withLocale } from "@modules/core/i18n/shared/lib";
import { View } from "react-native";
import styled from "styled-components/native";

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
  background-color: ${({ theme }) => theme.color.text};
`;

export const Title = withLocale({
	style: ({ fontFamily }) => ({
		default: {
			fontFamily: fontFamily.Arkhamic.regular,
			textAlign: "center",
		},
		ru: {
			fontFamily: fontFamily.Conkordia.regular,
		},
		ko: {
			fontFamily: fontFamily.SanCn.bold,
		},
		zh: {
			fontFamily: fontFamily.FZLiBian.regular,
		},
	}),
});
