import { View } from "react-native";
import styled from "styled-components/native";
import { type BaseList, BaseListMemo } from "../base/BaseList";

export const Container: typeof View = styled(View)`
  overflow: hidden;
`;

export const List: typeof BaseList = styled(BaseListMemo)`

`;

export const Content: typeof View = styled(View)`
  position: relative;
`;

export const ItemContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;
