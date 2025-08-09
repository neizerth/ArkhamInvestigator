import { color } from "@shared/config";
import { Dot, Icon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const NoType: typeof Dot = styled(Dot)`
  background-color: ${color.white};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

export const SkillType: typeof Icon = styled(Icon)`
  font-size: 15px;
  color: ${color.white};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
