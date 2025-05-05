import { Alegreya } from "@assets/fonts";
import { color, font, size } from "@shared/config";
import { Column, Row, UnscaledText } from "@shared/ui";
import { GameText } from "@widgets/game/game-text";
import { Image as BaseImage } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";
import { InvestigatorSkills } from "../InvestigatorSkills";
import { InvestigatorStats } from "../InvestigatorStats";
import { InvestigatorTrauma } from "../InvestigatorTrauma";
import { InvestigatorXP } from "../InvestigatorXP";

export const Container: typeof View = styled(View)`
  flex-grow: 1;
  gap: ${size.gap.default}px;
`;

export const Details: typeof Column = styled(Column)`
  gap: ${size.gap.default}px;
`;

export const Traits: typeof UnscaledText = styled(UnscaledText)`
  font-size: ${font.size.default}px;
  font-family: ${Alegreya.bold};
  color: ${color.light10};
`;

export { View as Section };
export { InvestigatorSkills as Skills };

export const Image: typeof BaseImage = styled(BaseImage)`
  max-width: 110px;
  height: 110px;
  flex: 1;
  border-radius: ${size.borderRadius.default}px;
`;

export const ImageContainer: typeof Row = styled(Row)`
  justify-content: flex-end;
  flex: 1;
`;

export const InvestigatorText: typeof GameText = styled(GameText)`
  font-size: ${font.size.default}px;
  font-family: ${Alegreya.medium};
  color: ${color.light10};
`;

export const InvestigatorTextContainer: typeof View = styled(View)`
  padding: 2px 0px 2px 6px;
  border-left-width: 2px;
  border-left-color: ${color.dark10};
`;

export const MainInfo: typeof Row = styled(Row)`
  justify-content: space-between;
  gap: ${size.gap.default}px;
`;

export const Stats: typeof InvestigatorStats = styled(InvestigatorStats)`
  
`;

export const Trauma: typeof InvestigatorTrauma = styled(InvestigatorTrauma)`
  flex: 2;
`;

export const Settings: typeof Row = styled(Row)`
  justify-content: space-between;
`;

export const XP: typeof InvestigatorXP = styled(InvestigatorXP)`
  flex: 1;
`;
