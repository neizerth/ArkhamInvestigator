import { CustomModalId } from "@modules/core/modal/entities/base/config";
import {
	CustomModal,
	type CustomModalProps,
	type ModalBackgroundType,
} from "@modules/core/modal/shared/base/ui";
import { routes } from "@shared/config";
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

	const modalType: ModalBackgroundType =
		pathname === routes.skillCheck ? "dark" : "light";

	if (!canDisplay(pathname)) {
		return;
	}

	return (
		<CustomModal
			{...props}
			type={modalType}
			id={CustomModalId.chaosTokenReveal}
		/>
	);
};
