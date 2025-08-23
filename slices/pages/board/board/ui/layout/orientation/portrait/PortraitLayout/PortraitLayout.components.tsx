import { size, statusBarHeight } from "@shared/config";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import {
	AdditionalInfoArea,
	PinnedSkilllChecksMemo as PinnedSkilllChecks,
} from "../../../../shared";
import { BoardHeader } from "../../../header";
import { Overlay as BaseOverlay } from "../Overlay";
import * as F from "../footer";
import * as S from "../sidebar";

export const Overlay: typeof BaseOverlay = styled(BaseOverlay)`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Container: typeof View = styled(View)`
  position: relative;
  padding-top: ${statusBarHeight}px;
`;

export const Header: typeof View = styled(BoardHeader)`
  position: relative;
`;

export const Main: typeof Row = styled(Row)`
  position: relative;
  padding: 0px ${size.gap.default}px;
  flex: 1;
`;

export const Area: typeof View = styled(AdditionalInfoArea)`
  position: relative;
  flex: 1;
`;

export const Footer: typeof F.Footer = styled(F.Footer)`
  position: relative;
`;

export const RightSidebar: typeof S.RightSidebar = styled(S.RightSidebar)`
`;

export const LeftSidebar: typeof S.LeftSidebar = styled(S.LeftSidebar)`
`;

export const SkillChecks: typeof PinnedSkilllChecks = styled(
	PinnedSkilllChecks,
)`
`;

export const Description: typeof F.BoardDescription = styled(
	F.BoardDescription,
)`
  position: absolute;
  left: 0;
  right: 0;
`;
