import "regenerator-runtime/runtime";
import Storage from "react-native-storage";
import storageBackend from "./storageBackend";

export const storage = new Storage({
	storageBackend,
	enableCache: false,

	// if data was not found in storage or expired data was found,
	// the corresponding sync method will be invoked returning
	// the latest data.
	sync: {
		// we'll talk about the details later.
	},
});
