import { color, size } from "@shared/config";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { ExpressionHistoryItemAction } from "../ExpressionHistoryItemAction";
import {
	PinActionMemo as PinAction,
	RemoveActionMemo as RemoveAction,
	SetNameActionMemo as SetNameAction,
} from "../actions";

export const Container: typeof Animated.View = styled(Animated.View)`
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

export const SetName: typeof SetNameAction = styled(SetNameAction)`
  
`;

export const Pin: typeof PinAction = styled(PinAction)`
  
`;

export const Remove: typeof RemoveAction = styled(RemoveAction)`
  
`;
