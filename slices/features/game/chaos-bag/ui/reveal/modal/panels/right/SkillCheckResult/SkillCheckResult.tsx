import {
	selectCurrentBoardProp,
	signedNumber,
	useAppSelector,
} from "@shared/lib";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import { chaosToken } from "../../../../../../config";
import {
	selectShowSkillCheckResult,
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "../../../../../../lib";
import * as C from "./SkillCheckResult.components";

export type SkillCheckResultProps = ViewProps;

const tokenColor = chaosToken.color.types;

export const SkillCheckResult = (props: SkillCheckResultProps) => {
	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const { code } = investigator;

	const result = useAppSelector(selectSkillCheckResult(code));
	const succedBy = useAppSelector(selectSkillCheckSucceedByResult(code));
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
