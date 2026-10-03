import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { TopBarButton } from "../TopBarButton";
import { TopBarTitle } from "../TopBarTitle";

export const Container: typeof View = styled(View)`
  ${({ theme: { size, safeAreaInsets } }) => css`
  flex-direction: row;
  align-items: center;
  padding: ${safeAreaInsets.top}px ${safeAreaInsets.left + size.gap.default}px ${safeAreaInsets.bottom + size.gap.small}px;
  gap: ${size.gap.default}px;
`}`;

export const Placeholder: typeof View = styled(View)`
  width: 48px;
`;

export const Title: typeof TopBarTitle = styled(TopBarTitle)`
  align-items: center;
  justify-content: center;
`;

export const Back: typeof TopBarButton = styled(TopBarButton)`
  align-items: flex-start;
  justify-content: center;
`;
