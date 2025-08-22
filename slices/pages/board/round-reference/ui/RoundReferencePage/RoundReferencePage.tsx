import { useGoBack } from "@modules/core/router/shared/lib";
import { Outside } from "@shared/ui";
import * as C from "./RoundReferencePage.components";

export const RoundReferencePage = () => {
	const back = useGoBack();

	return (
		<C.Container>
			<Outside onPress={back} />
			<C.Content>
				<C.Menu>
					<C.Button icon="close" onPress={back} />
				</C.Menu>
				<C.Reference />
			</C.Content>
		</C.Container>
	);
};
