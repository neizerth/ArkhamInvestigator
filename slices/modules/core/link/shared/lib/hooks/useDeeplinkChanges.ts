import { useAppDispatch } from "@shared/lib";
import * as Linking from "expo-linking";
import parseUrl from "parse-url";
import { useEffect } from "react";
import { isDeeplink } from "../logic";
import { deeplinkChanged } from "../store";

export const useDeeplinkChanges = () => {
	const dispatch = useAppDispatch();

	const linkingUrl = Linking.useLinkingURL();

	useEffect(() => {
		const validUrl = linkingUrl && isDeeplink(linkingUrl);

		if (!validUrl) {
			return;
		}
		const url = parseUrl(linkingUrl);
		dispatch(deeplinkChanged(url));
	}, [dispatch, linkingUrl]);
};
