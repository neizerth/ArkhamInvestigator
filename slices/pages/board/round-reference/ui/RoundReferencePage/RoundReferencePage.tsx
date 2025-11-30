import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { useGoBack } from "@modules/core/router/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { Outside } from "@shared/ui";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";
import * as C from "./RoundReferencePage.components";

type Params = {
	returnToRevealModal?: string;
};

export const RoundReferencePage = () => {
	const dispatch = useAppDispatch();
	const back = useGoBack();

	const { returnToRevealModal = "no" } = useLocalSearchParams<Params>();

	const openRevealModal = useCallback(() => {
		back();
		dispatch(openChaosTokenRevealModal());
	}, [dispatch, back]);

	return (
		<C.Container>
			<Outside onPress={back} />
			<C.Content>
				<C.Menu>
					{returnToRevealModal === "yes" ? (
						<C.Button icon="arrow_back" onPress={openRevealModal} />
					) : (
						<View />
					)}
					<C.Button icon="close" onPress={back} />
				</C.Menu>
				<C.Reference />
			</C.Content>
		</C.Container>
	);
};
