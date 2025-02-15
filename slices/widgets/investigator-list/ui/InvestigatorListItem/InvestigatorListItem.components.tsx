import { Icon } from "@shared/ui";
import { IMAGE_SIZE } from "@widgets/investigator-list/config";
import { FactionIcon as BaseFactionIcon } from "@shared/ui";

import { 
  Image as NativeImage,
  View 
} from "react-native";
import styled from "styled-components/native";

export const Image: typeof NativeImage = styled(NativeImage)
  .attrs({
    resizeMode: 'cover',
    resizeMethod: 'resize'
  })`
    width: ${IMAGE_SIZE}px;
    height: ${IMAGE_SIZE}px;
  ` 

export const FactionIcon: typeof BaseFactionIcon = styled(BaseFactionIcon)`
  width: 30px;
  height: 30px;
`

export const Container: typeof View = styled(View)`
  position: relative;
  height: ${IMAGE_SIZE}px;
  overflow: hidden;
`
export const Info: typeof View = styled(View)`
  position: absolute;
  flex-direction: row;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 10px 0 0;
  padding: 2px 5px 0 2px;
`


export const NeutralIcon = styled(Icon)
  .attrs({
    icon: 'neutral'
  })`
  font-size: 22px;
  flex-shrink: 0;
  color: white;
`