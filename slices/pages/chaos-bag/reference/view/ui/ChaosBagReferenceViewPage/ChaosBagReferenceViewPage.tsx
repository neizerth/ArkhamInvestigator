import { useGoBack } from "@modules/core/router/shared/lib";
import { Outside } from "@shared/ui";
import * as C from "./ChaosBagReferenceViewPage.components";

export const ChaosBagReferenceViewPage = () => {
	const back = useGoBack();

	return (
		<C.Container>
			<Outside onPress={back} />
			<C.Content>
				<C.Menu />
				<C.Reference />
			</C.Content>
		</C.Container>
	);
};
