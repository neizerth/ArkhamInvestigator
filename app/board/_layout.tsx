import { AppLayout } from "@modules/core/app/app/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";

export default function ChaosBagLayout() {
	return (
		<AppLayout>
			<Stack>
				<Stack.Screen name="modal/overview" options={asTransparentModal} />
				<Stack.Screen
					name="modal/round-reference"
					options={asTransparentModal}
				/>
			</Stack>
		</AppLayout>
	);
}
