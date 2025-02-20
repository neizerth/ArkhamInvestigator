import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorDetailSelectCard } from "../FactionCard";
import { size } from "@shared/config";

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

export const Card: typeof InvestigatorDetailSelectCard = styled(InvestigatorDetailSelectCard)`
  flex: 1;
`