import { HapticCheckbox } from "@modules/core/haptic/shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  
`;

export const Checkbox: typeof HapticCheckbox = styled(HapticCheckbox)`
  flex: 1;
  justify-content: flex-end;
`;
