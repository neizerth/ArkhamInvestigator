import { View } from "react-native";
import styled from "styled-components/native";
import { type PickerList, PickerListMemo } from "../list";

export const Container = styled(View)`
  width: 100%;
`;

export const List: typeof PickerList = styled(PickerListMemo)`

`;

export const ItemContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;
