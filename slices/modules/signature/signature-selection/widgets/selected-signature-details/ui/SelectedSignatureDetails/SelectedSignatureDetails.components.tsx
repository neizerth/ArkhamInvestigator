import { FactionCardMemo as FactionCard } from "@modules/faction/shared/ui";
import { statusBarHeight } from "@shared/config";
import { Outside as BaseOutside } from "@shared/ui";
import { ActivityIndicator, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Outside = styled(BaseOutside)`
  z-index: 1;
`;

export const Container: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const Content: typeof View = styled(View)`
  ${({ theme: { size } }) => css`
  flex: 1;
  position: relative;
  z-index: 2;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: ${statusBarHeight + size.gap.default}px ${size.gap.default}px 50px;
`}`;

export const Sections: typeof View = styled(View)`
    gap: ${({ theme }) => theme.size.gap.default}px;
  `;

export const Card: typeof FactionCard = styled(FactionCard)`
  flex: 1;
  position: relative;
  min-height: 300px;
  z-index: 2;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	({ theme }) => ({
		color: theme.color.dark10,
	}),
)`
	padding: ${({ theme }) => theme.size.gap.default}px 0;
  flex: 1;
  min-height: 300px;
  align-items: center;
  justify-content: center;
`;
