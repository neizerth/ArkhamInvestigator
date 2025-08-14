import { AppLayout } from "@modules/core/app/app/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";

export default function ChaosBagReferenceLayout() {
	return (
		<AppLayout>
			<Stack>
				<Stack.Screen name="index" options={asTransparentModal} />
				<Stack.Screen name="edit" options={asTransparentModal} />
			</Stack>
		</AppLayout>
	);
}
