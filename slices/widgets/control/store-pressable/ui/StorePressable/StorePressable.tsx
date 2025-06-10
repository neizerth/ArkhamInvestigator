import { Pressable, type PressableProps } from "@modules/haptic/widgets";
import { useAppDispatch } from "@shared/lib";
import type { AppActionCreator } from "@shared/model";
import { useCallback } from "react";

export type StorePressableProps = Omit<PressableProps, "onPress"> & {
	actionCreator: AppActionCreator<boolean>;
	value?: boolean;
};

export const StorePressable = ({
	actionCreator,
	value = true,
	...props
}: StorePressableProps) => {
	const dispatch = useAppDispatch();

	const onPress = useCallback(() => {
		dispatch(actionCreator(value));
	}, [dispatch, actionCreator, value]);

	return <Pressable {...props} onPress={onPress} />;
};
