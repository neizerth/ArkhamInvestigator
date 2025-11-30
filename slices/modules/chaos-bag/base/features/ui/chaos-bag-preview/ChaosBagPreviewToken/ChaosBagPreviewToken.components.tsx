import { ChaosTokenMenu } from "@modules/chaos-bag/base/entities/ui";
import { ChaosTokenPreview } from "@modules/chaos-bag/base/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview)`
  
`;

export const MenuContainer: typeof View = styled(View)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  align-items: center;
`;

export const TokenMenu: typeof ChaosTokenMenu = styled(ChaosTokenMenu)`
  flex: 1;
  width: 100%;
`;
