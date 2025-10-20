import { Alegreya } from "@assets/fonts";
import { SignaturePreview } from "@modules/signature/base/entities/ui";
import { font, size } from "@shared/config";
import { Row, TextView } from "@shared/ui";
import { InvestigatorSkillsPreview } from "@widgets/investigator/investigator-skills-preview";
import {
	ActionsValue,
	CluesValue,
	HealthValue,
	ResourcesValue,
	SanityValue,
} from "@widgets/investigator/value";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.default}px 0;
`;

export const Content: typeof Row = styled(Row)`
  gap: ${size.gap.default}px;
`;

export const Image: typeof SignaturePreview = styled(SignaturePreview)`
  border-radius: ${size.borderRadius.default}px;
`;

export const Primary: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Secondary: typeof Row = styled(Row)`
  flex: 1;
  justify-content: flex-end;
`;

export const Name: typeof TextView = styled(TextView)`
  font-size: ${font.size.default}px;
  font-family: ${Alegreya.bold};
`;

export const Skills: typeof InvestigatorSkillsPreview = styled(
	InvestigatorSkillsPreview,
)`
  
`;

export const Health: typeof HealthValue = styled(HealthValue)`
  
`;

export const Sanity: typeof SanityValue = styled(SanityValue)`
  
`;

export const Clues: typeof CluesValue = styled(CluesValue)`
  
`;

export const Resources: typeof ResourcesValue = styled(ResourcesValue)`
  
`;

export const Actions: typeof ActionsValue = styled(ActionsValue)`
  
`;

export const Stats: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
  justify-content: center;
`;
