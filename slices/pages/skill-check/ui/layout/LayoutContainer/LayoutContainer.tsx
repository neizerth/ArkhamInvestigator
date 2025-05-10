import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";

export type LayoutContainerProps = ViewProps;

export const LayoutContainer: typeof View = styled(View)`
  width: 290px;
`;
