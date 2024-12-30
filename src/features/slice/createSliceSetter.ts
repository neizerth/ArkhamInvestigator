import { CaseReducer, Draft, PayloadAction } from "@reduxjs/toolkit";

export const createSliceSetter = <State, K extends keyof State>(
    name: K, 
    onSet?: CaseReducer<State, PayloadAction<State[K]>>
): CaseReducer<State, PayloadAction<State[K]>> => 
    (state: Draft<State>, action: PayloadAction<State[K]>) => {
        const { payload } = action;
        if (!onSet) {
            return {
                ...state,
                [name]: payload,
            };
        }
        return onSet(state, action);
    };