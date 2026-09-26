import type { IconButton } from "@shared/ui";
import { ContentPage } from "@widgets/content";
import { TopBarButton } from "@widgets/navigation";
import { ActivityIndicator } from "react-native";
import styled, { css } from "styled-components/native";

export const Page: typeof ContentPage = styled(ContentPage)`
  ${({ theme: { color, size } }) => css`
  background-color: ${color.dark30};
  padding-bottom: ${size.gap.default}px;
`}`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	({ theme }) => ({
		color: theme.color.dark10,
	}),
)`
  flex: 1;
`;

export const BagButton: typeof IconButton = styled(TopBarButton).attrs(
	({ theme }) => ({
		iconStyle: {
			fontSize: 18,
			color: theme.color.light10,
		},
	}),
)`
  align-items: flex-end;
`;
