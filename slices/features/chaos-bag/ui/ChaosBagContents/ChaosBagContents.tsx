import type { ChaosTokenListProps } from "../token";
import * as C from "./ChaosBagContents.components";

export type ChaosBagContentsProps = Omit<ChaosTokenListProps, "data">;

export const ChaosBagContents = (props: ChaosBagContentsProps) => {
	return (
		<C.Container>
			<C.List />
		</C.Container>
	);
};
