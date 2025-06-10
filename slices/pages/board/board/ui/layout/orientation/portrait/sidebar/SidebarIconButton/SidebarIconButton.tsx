import {
	IconButton,
	type TouchableOpacityProps,
} from "@modules/haptic/widgets";
import { color } from "@shared/config";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";

const ios = Platform.OS === "ios";

export const SidebarIconButton: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 28,
		lineHeight: ios ? 30 : 32,
		color: color.white,
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 5,
	},
})`
  width: 60px;
  height: 50px;
  justify-content: center;
  align-items: center;
  ${({ disabled }: TouchableOpacityProps) =>
		disabled &&
		css`
    opacity: 0.5;
  `}
`;
