import * as reducer from "./features/reducer"
import { i18nReducer } from '@features/i18n'

export default {
  ...reducer,
  ...i18nReducer
}