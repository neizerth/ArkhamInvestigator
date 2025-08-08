import { signedNumber, useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import type { ViewProps } from "react-native";

import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import {
	selectShowSkillCheckResult,
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "@modules/chaos-bag/result/features/lib";
import { getChaosBagResultSign } from "@modules/chaos-bag/result/shared/lib";
import * as C from "./SkillCheckResult.components";

export type SkillCheckResultProps = ViewProps;

const tokenColor = chaosToken.color.types;

export const SkillCheckResult = (props: SkillCheckResultProps) => {
	const result = useAppSelector(selectSkillCheckResult);
	const succedBy = useAppSelector(selectSkillCheckSucceedByResult);
	const show = useAppSelector(selectShowSkillCheckResult);

	const fail = succedBy < 0 || result === "fail";

	const style = useMemo(() => {
		const color = fail ? tokenColor.autoFail : tokenColor.elderSign;

		return {
			color,
		};
	}, [fail]);

	if (!show) {
		return;
	}

	const sign = getChaosBagResultSign(result);
	const value = signedNumber(succedBy, sign);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.CompareSymbol>=</C.CompareSymbol>
				<C.Result>
					<C.ResultValue value={value} style={style} scale={false} />
				</C.Result>
			</C.Content>
		</C.Container>
	);
};
