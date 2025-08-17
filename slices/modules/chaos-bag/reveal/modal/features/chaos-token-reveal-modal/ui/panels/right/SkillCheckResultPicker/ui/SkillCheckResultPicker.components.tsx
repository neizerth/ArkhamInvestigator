import {
	AutoFail as Fail,
	AutoSuccessThin as Success,
} from "@modules/chaos-bag/base/shared/ui";
import { ResultValue } from "@modules/chaos-bag/result/shared/ui";
import { Row } from "@shared/ui";
import { Picker } from "@widgets/control/picker";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
	position: absolute;
	width: 100%;

`;

export const Control: typeof Picker = styled(Picker).attrs({
	gap: 50,
})`
`;

export const ValueContainer: typeof View = styled(View)`
	width: 100%;
`;

export const Value: typeof ResultValue = styled(ResultValue)`
	font-size: 38px;
`;

export const SpecialValue: typeof Value = styled(Value)`
`;

export const Special: typeof Row = styled(Row)`
	position: relative;
	align-items: center;
	justify-content: center;
`;

export const AutoFail: typeof Fail = styled(Fail)`
	font-size: 32px;
	line-height: 40px;
	width: 40px;
	left: 3px;
`;

export const AutoSuccess: typeof Success = styled(Success)`
	font-size: 50px;
	line-height: 60px;
	width: 38px;
`;
