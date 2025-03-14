import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import type { ConfigureStoreOptions } from '@reduxjs/toolkit'

type Middleware = ConfigureStoreOptions['middleware'];

export const serializableCheck ={
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
}