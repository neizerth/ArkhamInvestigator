import { store } from '@/store'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

export const StoreProvider = ({ children }: PropsWithChildren) => {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}