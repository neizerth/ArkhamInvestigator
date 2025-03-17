import styled from "styled-components/native";
import { TouchableOpacity } from "../../behavior/TouchableOpacity";
import { Text as BaseText } from "../../content/typography/Text";
import { color, font, size } from "@shared/config";

import { Icon as BaseIcon } from "../../game/icons/Icon";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  border-radius: ${size.borderRadius.default}px;
  flex-direction: row;
  align-items: center;
  gap: ${size.gap.default}px;
  padding: ${size.gap.default}px ${size.gap.medium}px;

  background-color: ${color.dark30};
`

export const Text: typeof BaseText = styled(BaseText)`
  text-align: center;
  font-size: ${font.size.medium}px;
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: ${font.size.small};
  color: ${color.light10};
`

