import { NativeModule, registerWebModule } from "expo";

import type { ChangeEventPayload } from "../../model";

type ChaosOddsModuleEvents = {
	onChange: (params: ChangeEventPayload) => void;
};

class ChaosOddsModule extends NativeModule<ChaosOddsModuleEvents> {
	PI = Math.PI;
	async setValueAsync(value: string): Promise<void> {
		this.emit("onChange", { value });
	}
	hello() {
		return "Hello world! 👋";
	}
}

export default registerWebModule(ChaosOddsModule, "ChaosOddsModule");
