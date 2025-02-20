import type { PayloadAction } from "@reduxjs/toolkit"
import type { IGameState } from "./game"

type SetSkinPayload = {
  code: string
  skinId: string | null
}
export const setInvestigatorSkin = (state: IGameState, action: PayloadAction<SetSkinPayload>) => {
  const { code, skinId } = action.payload;

  const selectedInvestigators = state.selectedInvestigators.map(
    investigator =>
      investigator.code === code ? { ...investigator, skinId } : investigator
  )

  return {
    ...state,
    selectedInvestigators
  }
}

type SetVariantPayload = {
  code: string
  variantId: string | null
}
export const setInvestigatorVariant = (state: IGameState, action: PayloadAction<SetVariantPayload>) => {
  const { code, variantId } = action.payload;

  const selectedInvestigators = state.selectedInvestigators.map(
    investigator =>
      investigator.code === code ? { ...investigator, variantId } : investigator
  )

  return {
    ...state,
    selectedInvestigators
  }
}

export default {
  setInvestigatorSkin,
  setInvestigatorVariant
}