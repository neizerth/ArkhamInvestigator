import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Button, Icon, type IconProps, Row, Text } from "@shared/ui";
import type { FC } from "react";
import { ActivityIndicator, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import styled, { css } from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  ${({ theme: { size } }) => css`
  gap: ${size.gap.default}px;
  padding: 0 ${size.gap.default}px;
`}`;

export const Invite: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const Info: typeof View = styled(View)`
  ${({ theme: { size } }) => css`
  padding: 37px 0px ${size.gap.default}px 0;
  gap: ${size.gap.default}px;
  flex: 1;
`}`;

export const Clients: typeof View = styled(View)`
  min-height: 80px;
  padding-right: ${({ theme }) => theme.size.gap.default}px;
`;

export const ClientsInfo: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const ClientsCountText: typeof Text = styled(Text)`
  font-size: ${({ theme }) => theme.font.size.medium}px;
  text-align: center;
`;

export const ClientsCountValue: typeof Text = styled(Text)`
  font-size: ${({ theme }) => theme.font.size.default}px;
`;

export const QRButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  ${({ theme: { color, size } }) => css`
  background-color: ${color.white};
  align-items: center;
  justify-content: center;
  padding: ${size.gap.small}px;
  border-radius: ${size.borderRadius.default}px;
`}`;

export const QR: typeof QRCode = styled(QRCode)`

`;

export const Share: typeof TouchableOpacity = styled(TouchableOpacity)`
  ${({ theme: { size } }) => css`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${size.gap.default}px;
  padding: ${size.gap.medium}px 0;
`}`;

export const ShareIcon: typeof Icon = styled(Icon)`
  color: ${({ theme }) => theme.color.light10};
`;

export const ShareText: typeof Text = styled(Text)`
  font-size: ${({ theme }) => theme.font.size.default}px;
`;

export const Code: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.size.gap.default}px 0;
`;

export const CodeHeader: typeof Row = styled(Row)`
  ${({ theme: { size, color } }) => css`
  justify-content: center;
  align-items: center;
  gap: ${size.gap.small}px;
  padding-bottom: ${size.gap.small}px;

  border-bottom-width: 1px;
  border-bottom-color: ${color.dark10};
`}`;

export const CodeLabel: typeof Text = styled(Text)`
  font-size: ${({ theme }) => theme.font.size.small}px;
  text-align: center;
`;

export const CodeIcon: typeof Icon = styled(Icon)`
  ${({ theme: { color, font } }) => css`
  color: ${color.light10};
  font-size: ${font.size.small}px;
`}`;

export const CodeValue: typeof Text = styled(Text)`
  font-size: 26px;
  line-height: 30px;
  color: ${({ theme }) => theme.color.light10};
  font-family: ${({ theme }) => theme.fontFamily.CrimsonPro.regular};
  text-align: center;
`;

export const Client: typeof Text = styled(Text)`
  padding-right: ${({ theme }) => theme.size.gap.default}px;
`;

export const HostClient: typeof Row = styled(Row)`
  position: relative;
  gap: 3px;
  align-items: center;
`;

type SelfIconProps = IconProps & {
	isHostRunning?: boolean;
};

export const SelfIcon: FC<SelfIconProps> = styled(Icon)`
  color: ${({ theme }) => theme.color.white};
  ${({ isHostRunning }: SelfIconProps) =>
		isHostRunning &&
		css`
    color:rgb(96, 205, 103);
  `}
  font-size: 14px;
  line-height: 14px;
  top: 1px;
`;

export const Next: typeof Button = styled(Button)`
background-color: ${({ theme }) => theme.color.dark20};

`;

export const NoHostIP: typeof Text = styled(Text)`
	padding: ${({ theme }) => theme.size.gap.default}px 0px;
	flex-shrink: 1;
	min-width: 0;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	({ theme }) => ({
		color: theme.color.dark10,
	}),
)`
`;

export const NoIP: typeof Row = styled(Row)`
  ${({ theme: { size } }) => css`
	padding: ${size.gap.default}px;
  gap: ${size.gap.default}px;
`}`;
