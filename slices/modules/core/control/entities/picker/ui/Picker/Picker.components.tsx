import { View } from "react-native";
import styled from "styled-components/native";
import { type PickerList, PickerListMemo } from "../animated";
import { StaticPicker } from "../static/StaticPicker/ui";

export const Container = styled(View)`
  width: 100%;
`;

export const List: typeof PickerList = styled(PickerListMemo)`

`;

export const Static: typeof StaticPicker = styled(StaticPicker)`

`;

export const ItemContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;
