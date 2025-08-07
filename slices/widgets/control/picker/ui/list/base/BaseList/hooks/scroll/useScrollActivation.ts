import type { PickerScrollEvent } from "@widgets/control/picker/model";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

export function useScrollActivation<T>(props: BaseListProps<T>) {
	const {
		onScrollEnd: onScrollEndProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onDeactivated: onDeactivatedProp,
		onScrollBeginDrag: onScrollBeginDragProp,
	} = props;
	const scroll = useRef(false);
	const touching = useRef(false);
	const active = useRef(false);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			scroll.current = true;
			touching.current = true;
			active.current = true;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const tryDeactivate = useCallback(() => {
		if (!active.current || scroll.current || touching.current) {
			return;
		}
		active.current = false;
		onScrollDeactivatedProp?.();
	}, [onScrollDeactivatedProp]);

	const onScrollEnd = useCallback(() => {
		scroll.current = false;
		tryDeactivate();
		onScrollEndProp?.();
	}, [onScrollEndProp, tryDeactivate]);

	const onDeactivated = useCallback(() => {
		touching.current = false;
		tryDeactivate();
		if (typeof onDeactivatedProp === "function") {
			onDeactivatedProp();
		}
	}, [onDeactivatedProp, tryDeactivate]);

	return {
		...props,
		onScrollBeginDrag,
		onDeactivated,
		onScrollEnd,
	};
}
