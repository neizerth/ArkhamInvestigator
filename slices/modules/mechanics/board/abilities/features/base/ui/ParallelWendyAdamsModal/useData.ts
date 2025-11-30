import { selectAvailableTokenCountByType } from "@modules/chaos-bag/reveal/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo, useState } from "react";

type State = {
	bless: number;
	curse: number;
	total: number;
};

type Max = {
	bless: number;
	curse: number;
};

export const useData = () => {
	const maxBless = useAppSelector(selectAvailableTokenCountByType("bless"));
	const maxCurse = useAppSelector(selectAvailableTokenCountByType("curse"));

	const max = useMemo(() => {
		return {
			bless: maxBless,
			curse: maxCurse,
		};
	}, [maxBless, maxCurse]);

	const [count, setCount] = useState({
		bless: 0,
		curse: 0,
		total: 0,
	});

	return useMemo(() => {
		const createHandlers = createTokenHandlers({
			setData: setCount,
			max,
		});
		return {
			count,
			bless: createHandlers("bless"),
			curse: createHandlers("curse"),
		};
	}, [count, max]);
};

type SetDataCallback = (prevState: State) => State;
type SetData = (callback: SetDataCallback) => void;

type CreateTokenHandlersOptions = {
	setData: SetData;
	max: Max;
};

const createTokenHandlers =
	({ setData, max }: CreateTokenHandlersOptions) =>
	(type: "bless" | "curse") => {
		return {
			add: () =>
				setData((prevState) => {
					const { total } = prevState;
					if (prevState[type] >= max[type]) {
						return prevState;
					}
					if (total > 1) {
						return prevState;
					}
					return {
						...prevState,
						[type]: prevState[type] + 1,
						total: total + 1,
					};
				}),
			remove: () =>
				setData((prevState) => {
					const { total } = prevState;
					if (total < 1) {
						return prevState;
					}
					return {
						...prevState,
						[type]: prevState[type] - 1,
						total: total - 1,
					};
				}),
		};
	};
