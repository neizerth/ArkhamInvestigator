import { size, statusBarHeight } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { TopBarButton } from "../TopBarButton";
import { TopBarTitle } from "../TopBarTitle";

export const Container: typeof View = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: ${statusBarHeight}px ${size.gap.default}px ${size.gap.small}px;
  gap: ${size.gap.default}px;
`;

export const Placeholder: typeof View = styled(View)`
  width: 48px;
`;

export const Title: typeof TopBarTitle = styled(TopBarTitle)`
  align-items: center;
  justify-content: center;
`;

export const Back: typeof TopBarButton = styled(TopBarButton)`
  justify-content: flex-start;
`;
