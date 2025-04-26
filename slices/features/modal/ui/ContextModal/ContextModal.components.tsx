import { Alegreya } from "@assets/fonts";
import { color, size } from "@shared/config";
import { Icon, Text } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../../haptic";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.default}px;
  justify-content: flex-end;
  filter: drop-shadow(0 0 5px rgb(0, 0, 0, 1));
`;

const radius = size.borderRadius.default;
export const Header: typeof View = styled(View)`
  position: relative;
  background-color: ${color.light30};
  border-radius: ${radius}px ${radius}px 0 0;
  align-items: center;
  padding: ${size.gap.small}px;
`;

export const Title: typeof Text = styled(Text)`
  font-family: ${Alegreya.medium};
  color: ${color.text};
`;

export const Body: typeof View = styled(View)`
  height: 300px;
  background-color: ${color.dark30};
  border-radius: 0 0 ${radius}px ${radius}px;
  padding: ${size.gap.default}px;
`;

export const Close: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 0px ${size.gap.default}px;
`;

export const CloseIcon: typeof Icon = styled(Icon)`
  color: ${color.dark10};
`;
