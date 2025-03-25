import { color, size } from "@shared/config";
import { Outside as BaseOutside, Text as BaseText } from "@shared/ui";
import { FactionCard } from "@widgets/investigator/faction/faction-card";
import { View } from "react-native";
import styled from "styled-components/native";

export const Text: typeof BaseText = styled(BaseText)`

`;

export const Card: typeof FactionCard = styled(FactionCard)`
  flex: 1;
  z-index: 2;
`;

export const Container: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;
  padding: ${size.gap.xxl}px ${size.gap.default}px;
`;

export const CardContent: typeof View = styled(View)`

`;

export const Outside = styled(BaseOutside)`
  z-index: 1;
`;
