import { modalStackScreenOptions } from "@modules/core/router/shared/lib/config";
import { Stack } from "expo-router";

export default function ModalLayout() {
	return <Stack screenOptions={modalStackScreenOptions} />;
}
