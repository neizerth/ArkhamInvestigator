import { TouchableOpacity } from "@features/haptic";
import { color } from "@shared/config";
import { FactionIconImage, Icon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
`;

export const Faction: typeof FactionIconImage = styled(FactionIconImage)`
  width: 50px;
`;

export const Neutral: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;
export const NeutralIcon: typeof Icon = styled(Icon)`
  color: ${color.light10};
  font-size: 37px;
  line-height: 47px;
  text-align: center;
`;
