import { color, size } from "@shared/config";
import { View } from "react-native";
import Reanimated from "react-native-reanimated";
import styled from "styled-components/native";
import { ExpressionHistoryItemAction } from "../ExpressionHistoryItemAction";
import { PinAction } from "../actions";

export const Container: typeof Reanimated.View = styled(Reanimated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: ${size.gap.default}px;
`;

export const Separator: typeof View = styled(View)`
  width: 1px;
  height: 30px;
  background-color: ${color.dark30};
`;
export const Action: typeof ExpressionHistoryItemAction = styled(
	ExpressionHistoryItemAction,
)`
`;

export const Rename: typeof Action = styled(Action)`
  
`;

export const Pin: typeof PinAction = styled(PinAction)`
  
`;
