import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Row } from "../../grid";
import { Text } from "../typography";

export const Container: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.small}px;
`;

export const TFlatBody: typeof FlatList = styled(FlatList)`
`;

export const TBody: typeof View = styled(View)`
`;

export const THead: typeof View = styled(View)`

`;

export const TR: typeof Row = styled(Row)`
  flex: 1;
  width: 100%;
  gap: ${({ theme }) => theme.size.gap.small}px;
`;

export const TD: typeof View = styled(View)`
`;

export const TH: typeof View = styled(View)`
`;

export const THContent: typeof Text = styled(Text)`
`;

export const TDContent: typeof Text = styled(Text)`
`;
