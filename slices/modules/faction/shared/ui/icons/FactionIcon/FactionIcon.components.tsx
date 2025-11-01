import { Icon } from "@shared/ui";
import styled from "styled-components/native";
import { FactionIconImage } from "../FactionIconImage";

export { View as Container } from "react-native";
export const FactionImage: typeof FactionIconImage = styled(FactionIconImage)`
  width: 30px;
  height: 30px;
`;

export const NeutralIcon = styled(Icon).attrs({
	icon: "neutral",
})`
  font-size: 24px;
  line-height: 24px;
  flex-shrink: 0;
  color: white;
`;
