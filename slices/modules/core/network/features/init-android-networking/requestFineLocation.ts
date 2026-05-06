import { PermissionsAndroid } from "react-native";

/**
 * Android 10+ does not expose Wi‑Fi identifiers (SSID, local IP via NetInfo) until
 * the user grants fine location — manifest entry alone is not enough. Emulators often
 * behave more permissively than hardware.
 */
export async function requestFineLocation(): Promise<boolean> {
	const result = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	);

	return result === PermissionsAndroid.RESULTS.GRANTED;
}
