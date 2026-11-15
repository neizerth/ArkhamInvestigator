import { FactionCardMemo } from "@modules/faction/shared/ui";
import type { AppTheme } from "@shared/model";
import { Outside as BaseOutside, Input as TextInput } from "@shared/ui";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";

export const Card: typeof FactionCardMemo = styled(FactionCardMemo)`
  flex: 1;
  z-index: 2;
`;

export const Container: typeof KeyboardAvoidingView = styled(
	KeyboardAvoidingView,
)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const getContentPadding = (theme: AppTheme) => {
	const { size, orientation, safeAreaInsets } = theme;
	if (orientation.landscape) {
		return `${safeAreaInsets.top}px ${safeAreaInsets.right}px ${safeAreaInsets.bottom}px ${safeAreaInsets.left}px`;
	}
	return `${size.gap.xxl}px ${size.gap.default}px`;
};

export const Content: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => getContentPadding(theme)};
`;

export const CardContent: typeof View = styled(View)`

`;

export const Outside = styled(BaseOutside)`
  z-index: 1;
`;

export const Input: typeof TextInput = styled(TextInput)`

`;
