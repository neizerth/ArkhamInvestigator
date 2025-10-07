import { color } from "@shared/config";
import { Select as BaseSelect } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  
`;

export const Select: typeof BaseSelect = styled(BaseSelect)`
  border: 1px solid ${color.dark10};
`;
