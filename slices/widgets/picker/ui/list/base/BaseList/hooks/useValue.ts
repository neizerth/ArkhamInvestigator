import { getValueIndex } from "@widgets/picker/lib";
import { useCallback, useEffect, useRef } from "react";
import type { FlatList } from "react-native";
import type { BaseListProps } from "../BaseList.types";

export const useValue = (props: BaseListProps) => {
	const {
		data,
		value,
		onUserActivationChange: onUserActivationChangeProp,
	} = props;
	const ref = useRef<FlatList<number>>(null);
	const active = useRef(false);

	const index = Math.min(getValueIndex(value, data), data.length - 1);

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		ref.current?.scrollToIndex({
			index,
			animated: !active.current,
		});
	}, [index]);

	const onUserActivationChange = useCallback(
		(activated: boolean) => {
			active.current = activated;
			if (typeof onUserActivationChangeProp === "function") {
				onUserActivationChangeProp(activated);
			}
		},
		[onUserActivationChangeProp],
	);

	return {
		...props,
		ref,
		onUserActivationChange,
	};
};
