import AsyncStorage from "@react-native-async-storage/async-storage";
import { currentPersistMigrationVersion } from "../migrations";

export const persistStorageConfig = {
	key: "root",
	keyPrefix: "",
	storage: AsyncStorage,
	version: currentPersistMigrationVersion,
};
