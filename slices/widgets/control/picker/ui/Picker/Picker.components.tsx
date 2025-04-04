import { View } from "react-native";
import styled from "styled-components/native";
import { PickerListMemo as PickerList } from "../list";

export const Container = styled(View)`
  width: 100%;
`;

export const List: typeof PickerList = styled(PickerList)`

`;

export const ItemContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;
