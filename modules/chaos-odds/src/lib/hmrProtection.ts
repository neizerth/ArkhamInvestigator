/**
 * Hot Module Replacement (HMR) protection utilities
 *
 * When a module is hot-reloaded, old Promises may still be executing.
 * This can cause crashes if they try to access stale JSI bindings or Runtime.
 *
 * Solution: Track module version in globalThis (persists across reloads)
 * and validate it before using potentially stale references.
 */

const MODULE_VERSION_KEY = "__CHAOS_ODDS_JSI_MODULE_VERSION__";

/**
 * Initialize or update module version on module load
 * Should be called once when the module is first loaded
 */
export function initializeModuleVersion(): void {
	const wasReloaded =
		typeof (globalThis as Record<string, unknown>)[MODULE_VERSION_KEY] !==
		"undefined";

	if (wasReloaded) {
		// Hot reload detected: increment version
		const currentVersion =
			((globalThis as Record<string, unknown>)[MODULE_VERSION_KEY] as number) ??
			0;
		(globalThis as Record<string, unknown>)[MODULE_VERSION_KEY] =
			currentVersion + 1;
	} else {
		// First load: initialize version
		(globalThis as Record<string, unknown>)[MODULE_VERSION_KEY] = 0;
	}
}

/**
 * Get current module version
 */
export function getModuleVersion(): number {
	return (
		((globalThis as Record<string, unknown>)[MODULE_VERSION_KEY] as number) ?? 0
	);
}

/**
 * Validates that the module version hasn't changed (no hot reload occurred)
 * @param versionAtStart Version captured at the start of an operation
 * @returns true if module was reloaded and operations should be aborted
 */
export function isModuleReloaded(versionAtStart: number): boolean {
	const currentVersion = getModuleVersion();
	if (currentVersion !== versionAtStart) {
		if (__DEV__) {
			console.warn(
				`[ChaosOddsJSI] Module was reloaded (started v${versionAtStart}, current v${currentVersion}), aborting operation`,
			);
		}
		return true;
	}
	return false;
}
