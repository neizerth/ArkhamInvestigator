import { GameText } from "@entities/game-text";
import { color, font, size } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../TouchableOpacity";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  border-radius: ${size.borderRadius.default}px;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding: ${size.gap.default}px ${size.gap.medium}px;

  background-color: ${color.dark30};
`;

export const Text: typeof GameText = styled(GameText).attrs({
	componentStyles: {
		paragraph: {
			flexWrap: "nowrap",
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
