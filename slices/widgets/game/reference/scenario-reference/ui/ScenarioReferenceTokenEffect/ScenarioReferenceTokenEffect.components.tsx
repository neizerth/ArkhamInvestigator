import { ChaosTokenOption } from "@modules/chaos-bag/base/features/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Checkbox, Icon, Row } from "@shared/ui";
import type { FC } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import styled, { css } from "styled-components";
import { refPx as upx } from "../../lib";
import { ScenarioReferenceEffectText } from "../ScenarioReferenceEffectText";
import { ScenarioReferenceToken } from "../ScenarioReferenceToken";

export const Container: typeof View = styled(View)`
  
`;

export const Content: typeof Row = styled(Row)`
  gap: ${upx(2)};
  align-items: center;
  width: 100%;
`;

export const Token: typeof ScenarioReferenceToken = styled(
	ScenarioReferenceToken,
)`
  
`;

export const TokenGroup: typeof View = styled(View)`
  gap: ${upx(1.5)};
  padding-right: ${upx(2)};
  border-right-color: rgba(175, 164, 146, 0.7);
  border-right-width: ${upx(0.5)};
`;

export const Effect: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  position: relative;
  flex: 1;
`;

export const EffectContent: typeof View = styled(View)`
  flex: 1;
`;
export const Text: typeof ScenarioReferenceEffectText = styled(
	ScenarioReferenceEffectText,
)`
`;

type ExpandProps = ViewProps & {
	open?: boolean;
};

export const Expand: FC<ExpandProps> = styled(View)<ExpandProps>`
  justify-content: center;
  width: 10px;
  ${({ open }) =>
		open &&
		css`
    transform: rotate(180deg);
  `}
`;

export const ExpandIcon: typeof Icon = styled(Icon)`
  color: ${color.text};
  font-size: 10px;
`;

export const Options: typeof View = styled(View)`
  gap: ${upx(1)};
  padding-right: ${upx(4)};
`;

export const Option: typeof ChaosTokenOption = styled(ChaosTokenOption).attrs({
	controlStyle: {
		color: color.text,
	},
})`
`;

export const OptionControl: typeof Checkbox = styled(Checkbox).attrs({
	contentStyle: {
		gap: 10,
	},
})`
  height: 40px;
  color: ${color.text};
`;
