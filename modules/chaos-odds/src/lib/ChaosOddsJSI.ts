// JSI Native Module
// Functions exposed via C++ JSI bindings

import {
	getModuleVersion,
	initializeModuleVersion,
	isModuleReloaded,
} from "./hmrProtection";

export type {
	ChaosOddsTokenInput as ChaosOddsInput,
	ChaosOddsFindTokenTarget as TokenTarget,
} from "../model";

/**
 * Result object returned by calculate() function
 * Contains the actual result string (memory is managed automatically by Hermes GC)
 */
export interface CalculateResult {
	/** JSON string with 100x100 matrix of probabilities */
	result: string;
}

/**
 * Task result status from pollResult
 * Values match C++ TaskStatus enum: 0=Pending, 1=Completed, 2=Failed, 3=Cancelled
 */
export type TaskStatus = 0 | 1 | 2 | 3;

// Task status constants (match C++ enum)
const TASK_STATUS_PENDING = 0;
const TASK_STATUS_COMPLETED = 1;
const TASK_STATUS_FAILED = 2;
const TASK_STATUS_CANCELLED = 3;

/**
 * Result from pollResult - null if pending, object if completed
 * Memory is managed automatically by Hermes GC - no manual freeString() needed
 */
export interface PollResult {
	status: TaskStatus;
	result?: string; // JSON result string (only if status === Completed)
}

interface ChaosOddsJSI {
	/**
	 * Start chaos bag odds calculation (JS-owned Promise pattern - GC-safe)
	 * @param available JSON string with available tokens
	 * @param revealed JSON string with revealed tokens (optional, defaults to empty array)
	 * @returns Task ID (number) - use pollResult() to check completion
	 */
	calculate(available: string, revealed: string): number;

	/**
	 * Start token odds calculation (JS-owned Promise pattern - GC-safe)
	 * @param targets JSON string with array of TokenTarget
	 * @param tokens JSON string with array of ChaosOddsToken
	 * @param params JSON string with FindTokensParams
	 * @returns Task ID (number) - use pollResult() to check completion
	 */
	findTokens(targets: string, tokens: string, params: string): number;

	/**
	 * Start item odds calculation (JS-owned Promise pattern - GC-safe)
	 * @param available JSON string with available tokens
	 * @param revealed JSON string with revealed tokens
	 * @param skill_value Skill value (0-100)
	 * @param difficulty Difficulty value (0-100)
	 * @returns Task ID (number) - use pollResult() to check completion
	 */
	calculateItem(
		available: string,
		revealed: string,
		skill_value: number,
		difficulty: number,
	): number;

	/**
	 * Poll result for a task
	 * @param task_id Task ID returned from calculate/findTokens/calculateItem
	 * @returns null if task is still pending, or PollResult object if completed/failed/cancelled
	 * Note: Memory is managed automatically by Hermes GC - no manual cleanup needed
	 */
	pollResult(task_id: number): PollResult | null;

	/**
	 * Cancel ongoing calculation
	 */
	cancel(): void;

	/**
	 * Set iOS idle timer disabled state (iOS only, no-op on other platforms)
	 * This prevents the device from going to sleep during long calculations
	 * @param enabled true to disable idle timer (keep awake), false to enable it
	 */
	setKeepAwakeEnabled?(enabled: boolean): void;
}

declare global {
	var ChaosOdds: ChaosOddsJSI | undefined;
}

// Initialize module version tracking on load
initializeModuleVersion();

/**
 * Poll for task result until completion (JS-owned Promise pattern - GC-safe)
 * Production-ready version with:
 * - No recursion (uses setTimeout to prevent stack overflow)
 * - Timeout protection (cancels after 60 seconds)
 * - HMR protection (checks moduleVersion on each iteration)
 * - GC-safe string copying (immediate copy, freeze result)
 */
async function pollTaskResult(
	task_id: number,
	moduleVersion: number,
): Promise<CalculateResult | null> {
	return new Promise<CalculateResult | null>((resolve) => {
		// Check if module was reloaded before starting
		if (isModuleReloaded(moduleVersion)) {
			resolve(null);
			return;
		}

		const jsi = global.ChaosOdds;
		if (!jsi || !jsi.pollResult) {
			resolve(null);
			return;
		}

		// Timeout protection: cancel task after 60 seconds
		const TIMEOUT_MS = 60000;
		const pollStartTime = performance.now();
		let pollCount = 0;
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		let isResolved = false; // Prevent multiple resolutions

		// Timeout handler
		const handleTimeout = () => {
			if (isResolved) return;
			isResolved = true;
			console.error(
				`ChaosOdds: Task ${task_id} timed out after ${TIMEOUT_MS}ms (${pollCount} polls)`,
			);
			// Cancel the task on timeout
			if (jsi.cancel) {
				jsi.cancel();
			}
			resolve(null);
		};

		// Set timeout
		timeoutId = setTimeout(handleTimeout, TIMEOUT_MS);

		// Polling loop (non-recursive, uses setTimeout)
		const pollTaskResultLoop = () => {
			// Prevent execution if already resolved
			if (isResolved) {
				return;
			}

			pollCount++;
			const pollIterStart = performance.now();

			// #region agent log
			fetch(
				"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "ChaosOddsJSI.ts:pollTaskResultLoop",
						message: "poll iteration start",
						data: {
							task_id,
							pollCount,
							timeSincePollStart: pollIterStart - pollStartTime,
						},
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "ui-freeze-debug",
						hypothesisId: "H1",
					}),
				},
			).catch(() => {});
			// #endregion

			// Check if module was reloaded (HMR protection)
			if (isModuleReloaded(moduleVersion)) {
				if (timeoutId) clearTimeout(timeoutId);
				if (!isResolved) {
					isResolved = true;
					resolve(null);
				}
				return;
			}

			// Verify JSI is still available
			const currentJsi = global.ChaosOdds;
			if (!currentJsi || !currentJsi.pollResult) {
				if (timeoutId) clearTimeout(timeoutId);
				if (!isResolved) {
					isResolved = true;
					resolve(null);
				}
				return;
			}

			// Poll for result
			const beforePollResult = performance.now();
			let result: PollResult | null = null;
			try {
				result = currentJsi.pollResult(task_id);
			} catch (error) {
				// C++ pollResult may throw if Runtime is destroyed
				console.error("ChaosOdds: pollResult threw error:", error);
				if (timeoutId) clearTimeout(timeoutId);
				if (!isResolved) {
					isResolved = true;
					resolve(null);
				}
				return;
			}
			const afterPollResult = performance.now();
			const pollResultDuration = afterPollResult - beforePollResult;

			// #region agent log
			fetch(
				"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "ChaosOddsJSI.ts:pollResult",
						message: "pollResult call completed",
						data: {
							task_id,
							pollCount,
							pollResultDuration,
							resultIsNull: result === null,
							resultStatus: result?.status,
						},
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "ui-freeze-debug",
						hypothesisId: "H1",
					}),
				},
			).catch(() => {});
			// #endregion

			if (result === null) {
				// Task is still pending - schedule next poll using setTimeout (non-recursive)
				// #region agent log
				fetch(
					"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							location: "ChaosOddsJSI.ts:poll-scheduling-next",
							message: "task pending, scheduling next poll",
							data: {
								task_id,
								pollCount,
								timeSincePollStart: performance.now() - pollStartTime,
							},
							timestamp: Date.now(),
							sessionId: "debug-session",
							runId: "ui-freeze-debug",
							hypothesisId: "H1",
						}),
					},
				).catch(() => {});
				// #endregion
				setTimeout(pollTaskResultLoop, 50); // Non-recursive polling
				return;
			}

			// Task completed - clear timeout
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}

			// Prevent multiple resolutions
			if (isResolved) {
				return;
			}
			isResolved = true;

			const totalPollTime = performance.now() - pollStartTime;

			// #region agent log
			fetch(
				"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "ChaosOddsJSI.ts:task-completed",
						message: "task completed, resolving promise",
						data: {
							task_id,
							pollCount,
							totalPollTime,
							resultStatus: result.status,
							resultSize: result.result?.length,
						},
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "ui-freeze-debug",
						hypothesisId: "H1",
					}),
				},
			).catch(() => {});
			// #endregion

			// Process result with GC-safe copying
			if (result.status === TASK_STATUS_COMPLETED && result.result) {
				// CRITICAL: Copy string immediately - result object may become invalid
				// after this function returns (especially during drainMicrotasks)
				const resultString = String(result.result);
				// Freeze result object to prevent mutation (GC-safe)
				const finalResult = Object.freeze({
					result: resultString,
				});
				resolve(finalResult);
			} else if (result.status === TASK_STATUS_CANCELLED) {
				// Cancelled
				resolve(null);
			} else {
				// Failed or unknown status
				console.error(
					`ChaosOdds: Task ${task_id} failed with status ${result.status}`,
				);
				resolve(null);
			}
		};

		// Start polling (non-recursive)
		setTimeout(pollTaskResultLoop, 0);
	});
}

/**
 * Creates a HMR-protected wrapper around JSI bindings
 * Validates module version before each call to prevent crashes from stale references
 */
function createProtectedWrapper(
	jsi: ChaosOddsJSI,
	moduleVersion: number,
): ChaosOddsJSI {
	return {
		calculate: (available: string, revealed: string) => {
			if (isModuleReloaded(moduleVersion)) {
				throw new Error("Module was reloaded");
			}
			return jsi.calculate(available, revealed);
		},
		findTokens: (targets: string, tokens: string, params: string) => {
			if (isModuleReloaded(moduleVersion)) {
				throw new Error("Module was reloaded");
			}
			return jsi.findTokens(targets, tokens, params);
		},
		calculateItem: (
			available: string,
			revealed: string,
			skill_value: number,
			difficulty: number,
		) => {
			if (isModuleReloaded(moduleVersion)) {
				throw new Error("Module was reloaded");
			}
			return jsi.calculateItem(available, revealed, skill_value, difficulty);
		},
		pollResult: (task_id: number) => {
			if (isModuleReloaded(moduleVersion)) {
				return null;
			}
			return jsi.pollResult(task_id);
		},
		cancel: () => {
			if (isModuleReloaded(moduleVersion)) {
				return;
			}
			jsi.cancel();
		},
		setKeepAwakeEnabled: jsi.setKeepAwakeEnabled
			? (enabled: boolean) => {
					if (isModuleReloaded(moduleVersion)) {
						return;
					}
					const setKeepAwake = jsi.setKeepAwakeEnabled;
					if (setKeepAwake) {
						setKeepAwake(enabled);
					}
				}
			: undefined,
	};
}

/**
 * Get ChaosOdds JSI bindings with HMR protection
 * Returns undefined if bindings are not available
 */
function getChaosOddsJSI(): ChaosOddsJSI | undefined {
	if (typeof global.ChaosOdds === "undefined") {
		if (__DEV__) {
			console.warn(
				"ChaosOdds JSI bindings are not available. " +
					"This usually means the native module failed to install JSI bindings. " +
					"Check that the native module is properly initialized.",
			);
		}
		return undefined;
	}

	const jsi = global.ChaosOdds;
	const moduleVersion = getModuleVersion();

	return createProtectedWrapper(jsi, moduleVersion);
}

/**
 * Wrapper that creates JS-owned Promise for calculate (GC-safe)
 */
export async function calculateWithPromise(
	available: string,
	revealed: string,
): Promise<CalculateResult | null> {
	const jsi = getChaosOddsJSI();
	if (!jsi) {
		return Promise.resolve(null);
	}

	const moduleVersion = getModuleVersion();
	if (isModuleReloaded(moduleVersion)) {
		return Promise.resolve(null);
	}

	try {
		const task_id = jsi.calculate(available, revealed);
		return pollTaskResult(task_id, moduleVersion);
	} catch (error) {
		console.error("ChaosOdds calculate error:", error);
		return Promise.resolve(null);
	}
}

/**
 * Wrapper that creates JS-owned Promise for findTokens (GC-safe)
 */
export async function findTokensWithPromise(
	targets: string,
	tokens: string,
	params: string,
): Promise<CalculateResult | null> {
	const jsi = getChaosOddsJSI();
	if (!jsi) {
		return Promise.resolve(null);
	}

	const moduleVersion = getModuleVersion();
	if (isModuleReloaded(moduleVersion)) {
		return Promise.resolve(null);
	}

	try {
		const task_id = jsi.findTokens(targets, tokens, params);
		return pollTaskResult(task_id, moduleVersion);
	} catch (error) {
		console.error("ChaosOdds findTokens error:", error);
		return Promise.resolve(null);
	}
}

/**
 * Wrapper that creates JS-owned Promise for calculateItem (GC-safe)
 */
export async function calculateItemWithPromise(
	available: string,
	revealed: string,
	skill_value: number,
	difficulty: number,
): Promise<CalculateResult | null> {
	const jsi = getChaosOddsJSI();
	if (!jsi) {
		return Promise.resolve(null);
	}

	const moduleVersion = getModuleVersion();
	if (isModuleReloaded(moduleVersion)) {
		return Promise.resolve(null);
	}

	try {
		const task_id = jsi.calculateItem(
			available,
			revealed,
			skill_value,
			difficulty,
		);
		return pollTaskResult(task_id, moduleVersion);
	} catch (error) {
		console.error("ChaosOdds calculateItem error:", error);
		return Promise.resolve(null);
	}
}

export default getChaosOddsJSI() as ChaosOddsJSI;
