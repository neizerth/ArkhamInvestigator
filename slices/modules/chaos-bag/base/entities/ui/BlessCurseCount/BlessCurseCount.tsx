import type { ViewProps } from "react-native";
import * as C from "./BlessCurseCount.components";

export type BlessCurseCountProps = ViewProps;

export const BlessCurseCount = (props: BlessCurseCountProps) => {
	return (
		<C.Container {...props}>
			<C.Token type="bless" />
			<C.Token type="curse" />
		</C.Container>
	);
};
