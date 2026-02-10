import { deeplinkChanged, isDeeplink } from "@modules/core/link/shared/lib";
import { useAppDispatch } from "@shared/lib";
import * as Linking from "expo-linking";
import parseUrl from "parse-url";
import { useEffect } from "react";

export const useDeeplinkChanges = () => {
	const dispatch = useAppDispatch();

	const linkingUrl = Linking.useLinkingURL();

	useEffect(() => {
		const validUrl = linkingUrl && isDeeplink(linkingUrl);

		if (!validUrl) {
			console.log("invalid deeplink", linkingUrl);
			return;
		}
		const url = parseUrl(linkingUrl);
		dispatch(deeplinkChanged(url));
	}, [dispatch, linkingUrl]);
};
