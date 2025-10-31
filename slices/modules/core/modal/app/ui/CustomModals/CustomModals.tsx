import { ChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/features/chaos-token-reveal-modal/ui";
import { FactionSelectModal } from "@modules/faction/entities/ui";
import { InvestigatorAbilityCustomModals } from "@modules/mechanics/board/abilities/features/base/ui";
import * as C from "./CustomModals.components";

export const CustomModals = () => {
	return (
		<C.Container>
			<FactionSelectModal />
			<ChaosTokenRevealModal />
			<InvestigatorAbilityCustomModals />
		</C.Container>
	);
};
