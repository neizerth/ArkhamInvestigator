import { FactionCardMemo as FactionCard } from "@modules/faction/shared/ui/faction-card";
import { size, statusBarHeight } from "@shared/config";
import { Outside as BaseOutside } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

const paddingBlock = Math.max(size.gap.xxl, statusBarHeight);

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
  flex: 1;
  position: relative;
  z-index: 2;
  justify-content: flex-end;
  width: 100%;
  max-width: 500px;
  padding: ${paddingBlock}px ${size.gap.default}px 50px;
`;

export const Sections: typeof View = styled(View).attrs({
	contentContainerStyle: {
		gap: `${size.gap.default}px`,
	},
})`
    gap: ${size.gap.default}px;
  `;

export const Card: typeof FactionCard = styled(FactionCard)`
  flex: 1;
  position: relative;
  z-index: 2;
`;
