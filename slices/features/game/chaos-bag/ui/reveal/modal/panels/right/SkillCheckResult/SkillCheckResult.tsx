import { signedNumber, useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import { chaosToken } from "../../../../../../config";
import {
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "../../../../../../lib";
import * as C from "./SkillCheckResult.components";

export type SkillCheckResultProps = ViewProps;

const tokenColor = chaosToken.color.types;

export const SkillCheckResult = (props: SkillCheckResultProps) => {
	const result = useAppSelector(selectSkillCheckResult);
	const succedBy = useAppSelector(selectSkillCheckSucceedByResult);

	const fail = succedBy < 0 || result === "fail";

	const style = useMemo(() => {
		const color = fail ? tokenColor.autoFail : tokenColor.elderSign;

		return {
			color,
		};
	}, [fail]);

	if (result === null) {
		return;
	}

	return (
		<C.Container {...props}>
			<C.Content>
				<C.CompareSymbol>=</C.CompareSymbol>
				<C.Result>
					<C.ResultValue
						value={signedNumber(succedBy)}
						style={style}
						scale={false}
					/>
				</C.Result>
			</C.Content>
		</C.Container>
	);
};
