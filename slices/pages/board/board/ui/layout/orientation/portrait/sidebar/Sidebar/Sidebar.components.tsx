import { View } from "react-native";
import styled from "styled-components/native";
import { AdditionalInfoArea } from "../../../../../shared";

export const Container: typeof View = styled(View)`
  justify-content: flex-end;
`;

export const Area: typeof AdditionalInfoArea = styled(AdditionalInfoArea)`
  flex: 1;
`;

export const Content: typeof View = styled(View)`
  
`;
