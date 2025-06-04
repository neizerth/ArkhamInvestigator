import { signedNumber, useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import {
	selectSkillCheckResult,
	selectSkillCheckSucceedByResult,
} from "../../../../../../lib";
import * as C from "./SkillCheckResult.components";

export type SkillCheckResultProps = ViewProps;

export const SkillCheckResult = (props: SkillCheckResultProps) => {
	const result = useAppSelector(selectSkillCheckResult);
	const succedBy = useAppSelector(selectSkillCheckSucceedByResult);

	if (result === null) {
		return;
	}

	return (
		<C.Container {...props}>
			<C.Content>
				<C.CompareSymbol>=</C.CompareSymbol>
				{typeof result === "number" && (
					<C.Result>
						<C.ResultValue value={signedNumber(succedBy)} scale={false} />
					</C.Result>
				)}
			</C.Content>
		</C.Container>
	);
};
