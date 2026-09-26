import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { SignatureSkillPreview } from "../SignatureSkillPreview";

export const Container: typeof Row = styled(Row)`
  gap: ${({ theme }) => theme.size.gap.small}px;
`;

export const Skill: typeof SignatureSkillPreview = styled(
	SignatureSkillPreview,
)`

`;
