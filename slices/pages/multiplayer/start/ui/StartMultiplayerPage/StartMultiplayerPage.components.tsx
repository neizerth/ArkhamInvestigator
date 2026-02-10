import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, size } from "@shared/config";
import { Icon, Input, Row, Tabs, Text } from "@shared/ui";
import { ContentPage } from "@widgets/content";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import { NewGameClientView } from "../NewGameClientView";
import { NewGameHostView } from "../NewGameHostView";

export const Page: typeof ContentPage = styled(ContentPage)`
  background-color: ${color.dark30};
`;

export const Hint: typeof Text = styled(Text)`
`;

export const Content: typeof View = styled(View)`
	gap: ${size.gap.default}px;
	padding: ${size.gap.default}px 0;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
  flex: 1;
`;

export const Player: typeof Row = styled(Row)`
	gap: ${size.gap.default}px;
`;

export const Nickname: typeof View = styled(View)`
  flex: 1;
	position: relative;
`;

export const NicknameInput: typeof Input = styled(Input).attrs({
	autoCapitalize: "none",
})`
	flex: 1;
`;

export const NetworkInfo: typeof TouchableOpacity = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
`;

export const GenerateIcon: typeof Icon = styled(Icon)`
	color: ${color.light10};
`;

export const GenerateRandomNickname: typeof TouchableOpacity = styled(
	TouchableOpacity,
)`
	padding: ${size.gap.default}px ${size.gap.medium}px;
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	align-items: center;
	justify-content: center;
`;

export const NetworkIcon: typeof Icon = styled(Icon)`
  margin-right: ${size.gap.default}px;
	color: ${color.light20};
`;

export const RoleSelect: typeof Tabs = styled(Tabs)`
`;

export const Host: typeof NewGameHostView = styled(NewGameHostView)`
`;

export const Client: typeof NewGameClientView = styled(NewGameClientView)`
`;

export const RoleTabs: typeof View = styled(View)`
`;

export const RoleTabsContent: typeof View = styled(View)`
  border-left-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-color: ${color.dark20};
	border-radius: 0px 0px ${size.borderRadius.default}px;
`;
