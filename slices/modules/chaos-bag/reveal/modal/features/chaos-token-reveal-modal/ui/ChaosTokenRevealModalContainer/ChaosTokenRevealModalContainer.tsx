import { CustomModalId } from "@modules/core/modal/entities/base/config";
import {
	CustomModal,
	type CustomModalProps,
} from "@modules/core/modal/shared/base/ui";
import { usePathname } from "expo-router";
import { canDisplayChaosTokenRevealModal as canDisplay } from "../../lib/logic";

export type ChaosTokenRevealModalContainerProps = Omit<
	CustomModalProps,
	"type" | "id"
>;

export const ChaosTokenRevealModalContainer = (
	props: ChaosTokenRevealModalContainerProps,
) => {
	const pathname = usePathname();

	if (!canDisplay(pathname)) {
		return;
	}

	return (
		<CustomModal {...props} type="dark" id={CustomModalId.chaosTokenReveal} />
	);
};
