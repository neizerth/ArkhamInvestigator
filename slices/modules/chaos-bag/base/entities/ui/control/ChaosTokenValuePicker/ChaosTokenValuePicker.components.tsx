import {
	ChaosTokenValue,
	AutoFail as Fail,
	AutoSuccessThin as Success,
} from "@modules/chaos-bag/base/shared/ui";
import { Picker } from "@widgets/control/picker";
import styled from "styled-components/native";

export const Control: typeof Picker = styled(Picker)`
`;

export const TokenValue: typeof ChaosTokenValue = styled(ChaosTokenValue)`
`;

export const AutoFail: typeof Fail = styled(Fail)`
`;

export const AutoSuccess: typeof Success = styled(Success)`
`;
