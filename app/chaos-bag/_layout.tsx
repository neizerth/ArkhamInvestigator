import {
	asTransparentModal,
	stackScreenOptions,
} from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";

export default function ChaosBagLayout() {
	return (
		<Stack screenOptions={stackScreenOptions}>
			<Stack.Screen name="preview" options={asTransparentModal} />
			<Stack.Screen name="fill" options={asTransparentModal} />

			<Stack.Screen name="reference/edit" options={asTransparentModal} />
			<Stack.Screen name="reference/index" options={asTransparentModal} />
		</Stack>
	);
}
