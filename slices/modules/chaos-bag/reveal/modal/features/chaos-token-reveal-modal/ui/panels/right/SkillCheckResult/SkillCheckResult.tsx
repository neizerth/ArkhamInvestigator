import {
	selectShowSkillCheckResult,
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "@modules/chaos-bag/result/features/lib";
import { getChaosBagResultSign } from "@modules/chaos-bag/result/shared/lib";
import { signedNumber, useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./SkillCheckResult.components";

export type SkillCheckResultProps = ViewProps;

export const SkillCheckResult = (props: SkillCheckResultProps) => {
	const result = useAppSelector(selectSkillCheckResult);
	const succedBy = useAppSelector(selectSkillCheckSucceedByResult);
	const show = useAppSelector(selectShowSkillCheckResult);

	const fail = succedBy < 0 || result === "fail";

	if (!show) {
		return;
	}

	const sign = getChaosBagResultSign(result);
	const value = signedNumber(succedBy, sign);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.CompareSymbol>=</C.CompareSymbol>
				<C.Result succeedBy={value} fail={fail} value={value} />
			</C.Content>
		</C.Container>
	);
};
