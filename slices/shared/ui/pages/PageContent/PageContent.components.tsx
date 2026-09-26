import type { FC } from "react";
import { type ScrollViewProps, View } from "react-native";

import styled from "styled-components/native";
import { ScrollView } from "../../behavior";

export const FullContent: typeof View = styled(View)`
  flex: 1;
`;

type ContentProps = ScrollViewProps & {
	navbarHeight: number;
};

export const Content: FC<ContentProps> = styled(ScrollView)`
  flex: 1;
  padding: ${({ navbarHeight, theme }) =>
		`0px ${theme.size.gap.medium}px ${navbarHeight}px ${theme.size.gap.medium}px`};
  margin-bottom: ${({ theme }) => theme.size.gap.default}px;
`;
