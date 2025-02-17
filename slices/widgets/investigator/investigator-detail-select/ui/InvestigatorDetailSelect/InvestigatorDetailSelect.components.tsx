import { color } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorDetailSelectCard } from "../FactionCard";

export const Container: typeof View = styled(View)`
  flex: 1;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`

export const Content: typeof View = styled(View)`
  flex: 1;
  width: 100%;
  max-width: 500px;
`

export const Card: typeof InvestigatorDetailSelectCard = styled(InvestigatorDetailSelectCard)`
  flex: 1
`