import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { useGoBack } from "@modules/core/router/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { Outside } from "@shared/ui";
import { useCallback } from "react";
import * as C from "./SkillTestReferencePage.components";

export const SkillTestReferencePage = () => {
	const dispatch = useAppDispatch();
	const back = useGoBack();

	const openRevealModal = useCallback(() => {
		back();
		dispatch(openChaosTokenRevealModal());
	}, [dispatch, back]);

	return (
		<C.Container>
			<Outside onPress={back} />
			<C.Content>
				<C.Menu>
					<C.Button icon="arrow_back" onPress={openRevealModal} />
					<C.Button icon="close" onPress={back} />
				</C.Menu>
				<C.Reference />
			</C.Content>
		</C.Container>
	);
};
