import type { Service } from "react-native-zeroconf";

export type ZeroconfService = Service & {
	networkId: string;
	index: number;
};
