import styled from "styled-components/native";
import { FactionIconImage as BaseFactionImage, Icon } from "@shared/ui";

export { View as Container } from 'react-native';
export const FactionImage: typeof BaseFactionImage = styled(BaseFactionImage)`
  width: 30px;
  height: 30px;
`

export const NeutralIcon = styled(Icon)
  .attrs({
    icon: 'neutral'
  })`
  font-size: 24px;
  flex-shrink: 0;
  color: white;
`