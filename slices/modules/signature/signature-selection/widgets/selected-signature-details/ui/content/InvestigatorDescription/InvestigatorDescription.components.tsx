import { GameText } from "@modules/core/theme/shared/ui";
import { SignatureSkills } from "@modules/signature/base/shared/ui";
import { Column, Row, UnscaledText } from "@shared/ui";
import { Image as BaseImage } from "expo-image";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { InvestigatorCounters } from "../InvestigatorCounters";
import { InvestigatorStats } from "../InvestigatorStats";
import { InvestigatorTrauma } from "../InvestigatorTrauma";
import { InvestigatorXP } from "../InvestigatorXP";

export const Container: typeof View = styled(View)`
  flex-grow: 1;
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Details: typeof Column = styled(Column)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Traits: typeof UnscaledText = styled(UnscaledText)`
  ${({ theme: { font, color, fontFamily } }) => css`
  font-size: ${font.size.default}px;
  font-family: ${fontFamily.Alegreya.bold};
  color: ${color.light10};

  max-width: 220px;
`}`;

export const Skills: typeof SignatureSkills = styled(SignatureSkills)`
`;

export { View as Section };

const imageStyle = css`
  max-width: 110px;
  height: 110px;
  flex: 1;
  border-radius: ${({ theme }) => theme.size.borderRadius.default}px;
`;

export const Image: typeof BaseImage = styled(BaseImage)`
  ${imageStyle}
`;

export const ImageContainer: typeof Row = styled(Row)`
  justify-content: flex-end;
  flex: 1;
`;

export const InvestigatorText: typeof GameText = styled(GameText)`
  ${({ theme: { font, color, fontFamily } }) => css`
  font-size: ${font.size.default}px;
  font-family: ${fontFamily.Alegreya.medium};
  color: ${color.light10};
`}`;

export const InvestigatorTextContainer: typeof View = styled(View)`
  padding: 2px 0px 2px 6px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.color.dark10};
`;

export const MainInfo: typeof Row = styled(Row)`
  justify-content: space-between;
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Stats: typeof InvestigatorStats = styled(InvestigatorStats)`
  
`;

export const Trauma: typeof InvestigatorTrauma = styled(InvestigatorTrauma)`
  flex: 2;
`;

export const Settings: typeof View = styled(View)`
  justify-content: space-between;
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const StatSettings: typeof Row = styled(Row)`
  justify-content: space-between;
`;

export { Row };

export const XP: typeof InvestigatorXP = styled(InvestigatorXP)`
  flex: 1;
`;

export const Counters: typeof InvestigatorCounters = styled(
	InvestigatorCounters,
)`
  flex: 1;
`;
