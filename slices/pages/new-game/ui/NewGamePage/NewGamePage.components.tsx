import { color } from "@shared/config";
import type { IconButton } from "@shared/ui";
import * as Shared from "@shared/ui";
import { TopBarButton } from "@widgets/navigation";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export const Page: typeof Shared.Page = styled(Shared.Page)`
  background-color: ${color.dark30};
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
