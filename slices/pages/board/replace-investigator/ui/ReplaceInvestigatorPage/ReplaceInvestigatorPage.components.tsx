import type { IconButton } from "@modules/haptic/widgets";
import { color, size } from "@shared/config";
import { ContentPage } from "@widgets/content";
import { TopBarButton } from "@widgets/navigation";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export const Page: typeof ContentPage = styled(ContentPage)`
  background-color: ${color.dark30};
  padding-bottom: ${size.gap.default}px;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
  flex: 1;
`;

export const BagButton: typeof IconButton = styled(TopBarButton).attrs({
	iconStyle: {
		fontSize: 18,
		color: color.light10,
	},
})`
  align-items: flex-end;
`;
