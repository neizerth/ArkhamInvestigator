import { appStarted } from "@modules/core/app/shared/lib";
import { selectAssetsLoaded } from "@modules/core/assets/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useEffect, useState } from "react";

export const useAppLoad = () => {
	const dispatch = useAppDispatch();
	const [started, setStarted] = useState(false);
	const assetsLoaded = useAppSelector(selectAssetsLoaded);
	const loaded = started && assetsLoaded;

	useEffect(() => {
		dispatch(appStarted());
		setStarted(true);
	}, [dispatch]);

	return loaded;
};
