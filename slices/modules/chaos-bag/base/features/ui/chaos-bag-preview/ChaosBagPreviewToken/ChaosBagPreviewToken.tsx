import { removeSingleChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { isChaosTokenTypeRemovable } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { revealChaosTokenById } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useGoBack } from "@modules/core/router/shared/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./ChaosBagPreviewToken.components";

export type ChaosBagPreviewTokenProps = TouchableOpacityProps & {
	token: ChaosBagToken;
	selected?: boolean;
};

export const ChaosBagPreviewToken = ({
	token,
	selected,
	disabled,
	...props
}: ChaosBagPreviewTokenProps) => {
	const dispatch = useAppDispatch();
	const back = useGoBack();
	const { onPress } = props;
	const { id } = token;

	const removable = isChaosTokenTypeRemovable(token.type);

	const reveal = useCallback(() => {
		back();
		dispatch(
			revealChaosTokenById({
				boardId: "current",
				id,
			}),
		);
	}, [dispatch, id, back]);

	const remove = useCallback(() => {
		if (!removable) {
			return false;
		}
		dispatch(
			removeSingleChaosToken({
				boardId: "current",
				token,
			}),
		);
	}, [dispatch, token, removable]);

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: reveal,
	});

	const swipeLeft = useSwipe({
		direction: "left",
		onSwipe: remove,
	});

	const gesture = useMemo(() => {
		return Gesture.Exclusive(swipeLeft, swipeRight);
	}, [swipeRight, swipeLeft]);

	return (
		<GestureDetector gesture={gesture}>
			<C.Container key={token.id} {...props} activeOpacity={1}>
				{selected && (
					<C.MenuContainer>
						<C.TokenMenu
							token={token}
							onClose={onPress}
							onReveal={reveal}
							onRemove={remove}
							removable={removable}
						/>
					</C.MenuContainer>
				)}
				<C.Token {...token} selected={selected} disabled={disabled} />
			</C.Container>
		</GestureDetector>
	);
};
