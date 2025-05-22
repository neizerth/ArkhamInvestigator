import { ChaosToken } from "@features/chaos-bag";
import { color } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components";
import { GameText } from "../../../game-text";
import { refPx as upx } from "../../lib";

export const Container: typeof View = styled(View)`
  flex: 1;
  gap: ${upx(8)}
`;

export const TokenGroup: typeof Row = styled(Row)`
  gap: ${upx(2)};
  align-items: center;
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const TokenEffect: typeof GameText = styled(GameText).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  font-size: ${upx(4)};
  line-height: ${upx(4.5)};
  color: ${color.text};
`;
