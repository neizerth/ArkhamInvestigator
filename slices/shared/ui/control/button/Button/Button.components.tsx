import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";
import { ArkhamDBText } from "../../../content";
import { Icon as BaseIcon } from "../../../game";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 7px;
  ${({ theme: { size, color } }) => css`
    border-radius: ${size.borderRadius.default}px;
    padding: ${size.gap.default}px ${size.gap.medium}px;
    background-color: ${color.dark30};
  `}
`;

const ios = Platform.OS === "ios";

export const Text: typeof ArkhamDBText = styled(ArkhamDBText).attrs(
	({ theme }) => ({
		componentStyles: {
			paragraph: {
				flexWrap: "nowrap",
			},
			icon: {
				top: ios ? -6 : 0,
				fontSize: theme.font.size.small,
			},
		},
	}),
)`
  text-align: center;
  position: relative;
  top: -2px;
  ${({ theme: { color, font } }) => css`
    color: ${color.light10};
    font-size: ${font.size.medium}px;
  `}
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  min-width: 15px;
  ${({ theme: { font, color } }) => css`
    font-size: ${font.size.small}px;
    color: ${color.light10};
    line-height: ${font.size.small}px;
  `}
`;
