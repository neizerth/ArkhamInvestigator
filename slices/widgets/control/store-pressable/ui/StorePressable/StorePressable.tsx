import { Pressable, type PressableProps } from "@features/haptic";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { useCallback } from "react";

export type StorePressableProps = Omit<PressableProps, "onPress"> & {
	actionCreator:
		| ActionCreatorWithPayload<boolean>
		| ((value: boolean) => AppThunk);
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
