import { size } from "@shared/config";
import { ScrollView } from "@shared/ui";
import type { FC } from "react";
import { type ScrollViewProps, View } from "react-native";

import styled from "styled-components/native";

export const FullContent: typeof View = styled(View)`
  flex: 1;
`;

type ContentProps = ScrollViewProps & {
	navbarHeight: number;
};

export const Content: FC<ContentProps> = styled(ScrollView)`
  flex: 1;
  padding: ${({ navbarHeight }: ContentProps) => `0px ${size.gap.medium}px ${navbarHeight}px ${size.gap.medium}px`};
  margin-bottom: ${size.gap.default}px;
`;
