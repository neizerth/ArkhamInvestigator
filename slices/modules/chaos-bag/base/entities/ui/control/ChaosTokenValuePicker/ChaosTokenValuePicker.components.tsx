import {
	ChaosTokenValue,
	AutoFail as Fail,
	AutoSuccess as Success,
} from "@modules/chaos-bag/base/shared/ui";
import { Picker } from "@widgets/control/picker";
import styled from "styled-components/native";

export const Control: typeof Picker = styled(Picker)`
`;

export const TokenValue: typeof ChaosTokenValue = styled(ChaosTokenValue)`
`;

export const AutoFail: typeof Fail = styled(Fail)`
  font-size: 90px;
  line-height: 100px;
`;

export const AutoSuccess: typeof Success = styled(Success)`
	position: absolute;
	left: -30px;
	font-size: 190px;
	width: 200px;
  line-height: 150px;
`;
