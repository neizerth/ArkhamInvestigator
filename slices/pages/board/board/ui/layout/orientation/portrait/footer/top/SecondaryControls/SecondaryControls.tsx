import { selectShowDoom, useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { Doom } from "../../../../../../shared";
import * as C from "./SecondaryControls.components";

export type SecondaryControlsProps = ViewProps;

export const SecondaryControls = (props: SecondaryControlsProps) => {
	const showDoom = useAppSelector(selectShowDoom);

	return (
		<C.Container {...props}>
			<C.Content>{showDoom && <Doom />}</C.Content>
		</C.Container>
	);
};
