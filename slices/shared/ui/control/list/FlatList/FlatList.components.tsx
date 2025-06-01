import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { size } from "../../../../config";
import { Row } from "../../../grid";

const scrollBarSize = 3;

export const Container: typeof View = styled(View)`

`;

export const Content: typeof Row = styled(Row)`
  flex: 1;
`;

export const List: typeof FlatList = styled(FlatList)`
  flex: 1;
`;

export const ScrollBar: typeof View = styled(View)`
  width: ${scrollBarSize}px;
  height: 100%;
`;

export const ScrollBarIndicator: typeof Animated.View = styled(Animated.View)`
  width: ${scrollBarSize}px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: ${size.borderRadius.default}px;
`;
