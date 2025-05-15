import { IconButton } from "@features/haptic";
import { color } from "@shared/config";
import type { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export type TopBarButtonProps = TouchableOpacityProps & {
	icon?: string;
};

export const TopBarButton: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 20,
		lineHeight: 20,
		color: color.light10,
	},
})`
	width: 48px;
  height: 48px;
	justify-content: center;
`;
