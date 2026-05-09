import { CrimsonPro } from "@assets/fonts";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, font, size } from "@shared/config";
import { Button, Icon, Row, Text } from "@shared/ui";
import { ActivityIndicator, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
  padding: 0 ${size.gap.default}px;
`;

export const Invite: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const Info: typeof View = styled(View)`
  padding: 27px 0 ${size.gap.default}px 0;
  gap: ${size.gap.default}px;
  flex: 1;
`;

export const Clients: typeof View = styled(View)`
  min-height: 80px;
  padding-right: ${size.gap.default}px;
`;

export const ClientsInfo: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const ClientsCountText: typeof Text = styled(Text)`
  font-size: ${font.size.medium}px;
  text-align: center;
`;

export const ClientsCountValue: typeof Text = styled(Text)`
  font-size: ${font.size.default}px;
`;

export const QRButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  background-color: ${color.white};
  align-items: center;
  justify-content: center;
  padding: ${size.gap.small}px;
  border-radius: ${size.borderRadius.default}px;
`;

export const QR: typeof QRCode = styled(QRCode)`

`;

export const Share: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${size.gap.default}px;
  padding: ${size.gap.medium}px 0;
`;

export const ShareIcon: typeof Icon = styled(Icon)`
  color: ${color.light10};
`;

export const ShareText: typeof Text = styled(Text)`
  font-size: ${font.size.default}px;
`;

export const Code: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${size.gap.default}px 0;
`;

export const CodeLabel: typeof Text = styled(Text)`
  font-size: ${font.size.small}px;
  border-bottom-width: 1px;
  border-bottom-color: ${color.dark10};
  text-align: center;
`;

export const CodeValue: typeof Text = styled(Text)`
  font-size: 26px;
  line-height: 30px;
  color: ${color.light10};
  font-family: ${CrimsonPro.regular};
  text-align: center;
`;

export const Client: typeof Text = styled(Text)`
  padding-right: ${size.gap.default}px;
`;

export const HostClient: typeof Row = styled(Row)`
  position: relative;
  gap: 3px;
  align-items: center;
`;

export const SelfIcon: typeof Icon = styled(Icon)`
  color: ${color.white};
  font-size: 14px;
  line-height: 14px;
  top: 2px;
`;

export const Next: typeof Button = styled(Button)`
background-color: ${color.dark20};

`;

export const NoHostIP: typeof Text = styled(Text)`
	padding: ${size.gap.default}px 0px;
	flex-shrink: 1;
	min-width: 0;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
`;

export const NoIP: typeof Row = styled(Row)`
	padding: ${size.gap.default}px;
  gap: ${size.gap.default}px;
`;
