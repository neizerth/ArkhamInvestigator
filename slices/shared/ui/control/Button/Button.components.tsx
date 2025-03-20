import { color, font, size } from "@shared/config";
import styled from "styled-components/native";
import { TouchableOpacity } from "../../behavior/TouchableOpacity";
import { Text as BaseText } from "../../content/typography/Text";

import { Icon as BaseIcon } from "../../game/icons/Icon";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  border-radius: ${size.borderRadius.default}px;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding: ${size.gap.default}px ${size.gap.medium}px;

  background-color: ${color.dark30};
`;

export const Text: typeof BaseText = styled(BaseText)`
  text-align: center;
  font-size: ${font.size.medium}px;
  position: relative;
  top: -2px;
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: ${font.size.small}px;
  color: ${color.light10};
  line-height: ${font.size.small}px;
`;
