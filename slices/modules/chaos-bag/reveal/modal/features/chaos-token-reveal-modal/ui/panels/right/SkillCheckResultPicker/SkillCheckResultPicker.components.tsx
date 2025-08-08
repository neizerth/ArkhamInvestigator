import {
	ChaosTokenValue,
	AutoFail as Fail,
	AutoSuccessThin as Success,
} from "@modules/chaos-bag/base/shared/ui";
import { Picker } from "@widgets/control/picker";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
	position: relative;
`;

export const Control: typeof Picker = styled(Picker).attrs({
	gap: 50,
})`
	position: absolute
`;

export const Value: typeof ChaosTokenValue = styled(ChaosTokenValue)`
	font-size: 38px;
	width: 60px;
`;

export const AutoFail: typeof Fail = styled(Fail)`
	font-size: 50px;
	line-height: 80px;
	left: -5px;
`;

export const AutoSuccess: typeof Success = styled(Success)`
	font-size: 60px;
	line-height: 60px;
	width: 60px;
`;
