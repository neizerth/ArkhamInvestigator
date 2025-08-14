import { AppLayout } from "@modules/core/app/app/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";

export default function ChaosBagLayout() {
	return (
		<AppLayout>
			<Stack>
				<Stack.Screen name="preview" options={asTransparentModal} />
				<Stack.Screen name="fill" options={asTransparentModal} />
			</Stack>
		</AppLayout>
	);
}
