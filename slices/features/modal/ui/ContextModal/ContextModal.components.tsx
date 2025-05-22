import { Alegreya } from "@assets/fonts";
import { color, size, statusBarHeight } from "@shared/config";
import { Icon, Row, Text } from "@shared/ui";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "../../../haptic";

export const Container: typeof View = styled(View)`
  padding: ${statusBarHeight + size.gap.default}px ${size.gap.default}px ${size.gap.small}px;
  justify-content: flex-end;
  filter: drop-shadow(0 0 5px rgb(0, 0, 0, 1));
  background-color: rgba(0, 0, 0, 0.3);
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

export const Content: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		minHeight: 100,
	},
})`
`;

export const Body: typeof View = styled(View)`
  background-color: ${color.dark20};
  border-radius: 0 0 ${radius}px ${radius}px;
  padding: ${size.gap.default}px;
`;

const buttonStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 0px ${size.gap.default}px;
  justify-content: center;
  align-items: center;
`;

export const Close: typeof TouchableOpacity = styled(TouchableOpacity)`
  ${buttonStyle};
  right: 0;
`;

export const Action: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: 0px 7px;
  justify-content: center;
  align-items: center;
`;

export const Actions: typeof Row = styled(Row)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3px;
`;

export const ActionIcon: typeof Icon = styled(Icon)`
  color: ${color.dark10};
  font-size: 16px;
`;
