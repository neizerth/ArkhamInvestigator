import { TouchableOpacity } from "@features/haptic";
import { color } from "@shared/config";
import { FactionIconImage, Icon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: relative;
  align-items: center;
`;

export const Faction: typeof FactionIconImage = styled(FactionIconImage)`
  width: 50px;
  flex: 1;
`;

export const Neutral: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
  width: 50px;
`;
export const NeutralIcon: typeof Icon = styled(Icon)`
  color: ${color.light10};
  padding-bottom: 5px;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
`;
