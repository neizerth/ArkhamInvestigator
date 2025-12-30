import { size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { SignatureSkillPreview } from "../SignatureSkillPreview";

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
`;

export const Skill: typeof SignatureSkillPreview = styled(
	SignatureSkillPreview,
)`

`;
