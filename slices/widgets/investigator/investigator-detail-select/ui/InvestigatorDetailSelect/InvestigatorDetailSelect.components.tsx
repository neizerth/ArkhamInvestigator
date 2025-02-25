import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorDetailSelectCardMemo as CardMemo } from "../FactionCard";
import { size } from "@shared/config";
import { Outside as BaseOutside } from "@shared/ui";

export const Outside = styled(BaseOutside)`
  z-index: 1;
`

export const Container: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`

export const Content: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: ${size.gap.default}px;
`

export const Sections: typeof View = styled(View)
  .attrs({
    contentContainerStyle: {
      gap: `${size.gap.default}px`
    }
  })`
    gap: ${size.gap.default}px;
  `

export const Card: typeof CardMemo = styled(CardMemo)`
  flex: 1;
  position: relative;
  z-index: 2;
`