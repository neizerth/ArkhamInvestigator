import AsyncStorage from "@react-native-async-storage/async-storage";
import { currentPersistMigrationVersion } from "../migrations";
import { persistTransforms } from "./transforms";

/** Runtime-only state: it is meaningless after a restart. */
export const persistBlacklist = [
	"app",
	"assetDownloader",
	"modal",
	"networkClient",
];

export const persistStorageConfig = {
	key: "root",
	keyPrefix: "",
	storage: AsyncStorage,
	version: currentPersistMigrationVersion,
	blacklist: persistBlacklist,
	transforms: persistTransforms,
};
