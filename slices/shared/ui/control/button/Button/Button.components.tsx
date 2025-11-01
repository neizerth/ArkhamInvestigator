import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { color, font, size } from "../../../../config";
import { ArkhamDBText } from "../../../content";
import { Icon as BaseIcon } from "../../../game";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  border-radius: ${size.borderRadius.default}px;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding: ${size.gap.default}px ${size.gap.medium}px;

  background-color: ${color.dark30};
`;

const ios = Platform.OS === "ios";

export const Text: typeof ArkhamDBText = styled(ArkhamDBText).attrs({
	componentStyles: {
		paragraph: {
			flexWrap: "nowrap",
		},
		icon: {
			top: ios ? -6 : 0,
			fontSize: font.size.small,
		},
	},
})`
  text-align: center;
  color: ${color.light10};
  font-size: ${font.size.medium}px;
  position: relative;
  top: -2px;
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: ${font.size.small}px;
  color: ${color.light10};
  line-height: ${font.size.small}px;
  min-width: 15px;
`;
