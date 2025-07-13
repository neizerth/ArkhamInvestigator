import { ChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/features/chaos-token-reveal-modal/ui";
import { FactionSelectModal } from "@modules/faction/entities/faction-select-modal";
import * as C from "./CustomModals.components";

export const CustomModals = () => {
	return (
		<C.Container>
			<FactionSelectModal />
			<ChaosTokenRevealModal />
		</C.Container>
	);
};
