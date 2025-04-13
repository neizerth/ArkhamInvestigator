import AsyncStorage from "@react-native-async-storage/async-storage";

export const persistStorageConfig = {
	key: "root",
	keyPrefix: "",
	storage: AsyncStorage,
	version: 6,
};
