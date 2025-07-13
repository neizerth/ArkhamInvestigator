import { revealChaosTokens } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native";
import { ChaosTokenRevealModalContext as Context } from "../../lib";
import * as C from "./ChaosTokenOneMoreRevealLoader.components";

export type ChaosTokenOneMoreRevealLoaderProps = ViewProps;

export const ChaosTokenOneMoreRevealLoader = (
	props: ChaosTokenOneMoreRevealLoaderProps,
) => {
	const { oneMoreLoading } = useContext(Context);

	if (!oneMoreLoading) {
		return;
	}

	return <LoaderView {...props} />;
};

const LoaderView = (props: ChaosTokenOneMoreRevealLoaderProps) => {
	const dispatch = useAppDispatch();
	const { setOneMoreLoading } = useContext(Context);

	const onPress = useCallback(() => {
		setOneMoreLoading(false);
	}, [setOneMoreLoading]);

	const onLoad = useCallback(() => {
		dispatch(
			revealChaosTokens({
				boardId: "current",
				count: 1,
			}),
		);
		setOneMoreLoading(false);
	}, [dispatch, setOneMoreLoading]);

	return (
		<C.Container onPress={onPress} {...props}>
			<C.Loader onLoad={onLoad} duration={500} show />
		</C.Container>
	);
};
