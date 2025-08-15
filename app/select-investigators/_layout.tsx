import {
	asTransparentModal,
	stackScreenOptions,
} from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";

export default function SelectInvestigatorsLayout() {
	return (
		<Stack screenOptions={stackScreenOptions}>
			<Stack.Screen name="details" options={asTransparentModal} />
		</Stack>
	);
}
