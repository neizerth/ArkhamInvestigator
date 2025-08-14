import { AppLayout } from "@modules/core/app/app/ui";
import { asTransparentModal } from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";

export default function SelectInvestigatorsLayout() {
	return (
		<AppLayout>
			<Stack>
				<Stack.Screen name="details" options={asTransparentModal} />
			</Stack>
		</AppLayout>
	);
}
