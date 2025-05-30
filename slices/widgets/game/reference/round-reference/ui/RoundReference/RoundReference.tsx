import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import type { ViewProps } from "react-native";
import { selectTimingRules } from "../../lib";
import { getRoundPhases } from "../../lib";
import * as C from "./RoundReference.components";

export type RoundReferenceProps = ViewProps;

export const RoundReference = (props: RoundReferenceProps) => {
	const item = useAppSelector(selectTimingRules);

	if (!item) {
		return;
	}

	const { title } = item;

	const phases = getRoundPhases(item);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Title>
					<C.TitleContent>{title}</C.TitleContent>
				</C.Title>
				<Delay delayMs={0}>
					<C.Phases removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}>
						{phases.map((phase) => (
							<C.Phase key={phase.id} phase={phase} />
						))}
					</C.Phases>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
