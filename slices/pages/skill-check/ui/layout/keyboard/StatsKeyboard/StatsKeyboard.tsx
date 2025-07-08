import { sendStatSignal } from "@modules/board/skill-check/shared/lib";
import { iconMapping } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { useCallback } from "react";
import type { ScrollViewProps } from "react-native";
import { useKeyCheck } from "../../../../lib";
import * as C from "./StatsKeyboard.components";

export type StatsKeyboardProps = ScrollViewProps;

export const StatsKeyboard = ({ ...props }: StatsKeyboardProps) => {
	const dispatch = useAppDispatch();
	const showKeyReveal = useKeyCheck();

	const sendStat = useCallback(
		(value: InvestigatorBoardNumericStat) => () => {
			dispatch(sendStatSignal(value));
		},
		[dispatch],
	);

	const withProps = (value: InvestigatorBoardNumericStat) => {
		return {
			icon: iconMapping.stat.simple[value],
			onPress: sendStat(value),
			onSwipeUp: showKeyReveal({
				operator: "add",
				type: "stat",
				statType: value,
			}),
			onSwipeDown: showKeyReveal({
				operator: "subtract",
				type: "stat",
				statType: value,
			}),
		};
	};

	return (
		<C.Container {...props} horizontal>
			<C.Content>
				<C.Rule />
				<C.Button {...withProps("willpower")} />
				<C.Rule />
				<C.Button {...withProps("intellect")} />
				<C.Rule />
				<C.Button {...withProps("combat")} />
				<C.Rule />
				<C.Button {...withProps("agility")} />
				<C.Rule />
				<C.Button {...withProps("health")} />
				<C.Rule />
				<C.Button {...withProps("sanity")} />
				<C.Rule />
				<C.Button {...withProps("resources")} />
			</C.Content>
		</C.Container>
	);
};
