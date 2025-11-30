import { useGoBack } from "@modules/core/router/shared/lib";
import { Outside } from "@shared/ui";
import { useLocalSearchParams } from "expo-router";
import * as C from "./ChaosBagReferenceViewPage.components";

type Params = {
	returnToRevealModal?: string;
};

export const ChaosBagReferenceViewPage = () => {
	const back = useGoBack();

	const { returnToRevealModal = "no" } = useLocalSearchParams<Params>();

	const returnToReveal = returnToRevealModal === "yes";
	return (
		<C.Container>
			<Outside onPress={back} />
			<C.Content>
				<C.Menu returnToReveal={returnToReveal} />
				<C.Reference />
			</C.Content>
		</C.Container>
	);
};
