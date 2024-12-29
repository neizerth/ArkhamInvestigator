export const createSliceSelector = <State, K extends keyof State>(name: K) =>
    (state: State) => state[name];