import { iconMapping } from "@shared/config";
import { sendStatSignal, useAppDispatch } from "@shared/lib";
import type { InvestigatorBoardStat } from "@shared/model";
import { useCallback } from "react";
import type { ScrollViewProps } from "react-native";
import * as C from "./StatsKeyboard.components";

export type StatsKeyboardProps = ScrollViewProps;

export const StatsKeyboard = ({ ...props }: StatsKeyboardProps) => {
	const dispatch = useAppDispatch();

	const sendStat = useCallback(
		(value: InvestigatorBoardStat) => () => {
			dispatch(sendStatSignal(value));
		},
		[dispatch],
	);

	const withProps = (value: InvestigatorBoardStat) => {
		return {
			icon: iconMapping.stat.simple[value],
			onPress: sendStat(value),
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
