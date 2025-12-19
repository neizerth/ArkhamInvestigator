/**
 * Type-safe access to globalThis for storing module state
 * that persists across hot reloads.
 *
 * This is useful for tracking state that needs to survive
 * module reloads, such as calculation IDs or module versions.
 */
export type GlobalStateAccessor<T extends Record<string, unknown>> = T &
	typeof globalThis;

/**
 * Get type-safe access to globalThis with custom state keys
 *
 * @example
 * ```ts
 * const STATE_KEYS = { COUNT: "__MY_COUNT__" } as const;
 * type MyState = { [STATE_KEYS.COUNT]?: number };
 * const getState = () => getGlobalState<MyState>();
 * ```
 */
export const getGlobalState = <
	T extends Record<string, unknown>,
>(): GlobalStateAccessor<T> => globalThis as GlobalStateAccessor<T>;
