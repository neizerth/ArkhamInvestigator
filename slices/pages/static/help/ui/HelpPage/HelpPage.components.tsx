import { color, font, size } from "@shared/config";
import { GameText } from "@shared/ui";
import { Icon as BaseIcon } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  color: ${color.light10};
`;

export const IconList: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const ListItem: typeof View = styled(View)`
`;

export const IconText: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;
