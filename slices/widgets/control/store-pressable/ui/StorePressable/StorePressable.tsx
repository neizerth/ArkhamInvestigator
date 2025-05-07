import { Pressable, type PressableProps } from "@features/haptic";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { useCallback } from "react";

export type StorePressableProps = Omit<PressableProps, "onPress"> & {
	actionCreator:
		| ActionCreatorWithPayload<boolean>
		| ((value: boolean) => AppThunk);
};

export const StorePressable = ({
	actionCreator,
	...props
}: StorePressableProps) => {
	const dispatch = useAppDispatch();

	const onPress = useCallback(() => {
		dispatch(actionCreator(true));
	}, [dispatch, actionCreator]);

	return <Pressable {...props} onPress={onPress} />;
};
