import { navBarHeight, size } from "@shared/config";
import { ScrollView } from "@shared/ui";
import { View } from "react-native";

import styled from "styled-components/native";

export const FullContent: typeof View = styled(View)`
  flex: 1;
`;

export const Content: typeof ScrollView = styled(ScrollView)`
  flex: 1;
  padding: 0px ${size.gap.medium}px ${navBarHeight}px ${size.gap.medium}px;
  margin-bottom: ${size.gap.default}px;
`;
