import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import type { ViewProps } from "react-native";
import { selectChaosBagContents } from "../../lib";
import * as C from "./ChaosBagPreview.components";

export type ChaosBagPreviewProps = ViewProps;

export const ChaosBagPreview = (props: ChaosBagPreviewProps) => {
	const tokens = useAppSelector(selectChaosBagContents);

	return (
		<C.Container title="Chaos Bag">
			<Delay>
				<C.Content>
					<C.BlessCurse />
					<C.List>
						{tokens.map((token) => (
							<C.Token key={token.id} type={token.type} />
						))}
					</C.List>
				</C.Content>
			</Delay>
		</C.Container>
	);
};
