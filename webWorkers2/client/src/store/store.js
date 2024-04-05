import { configureStore } from '@reduxjs/toolkit'
import { applicationReducer } from './application_slice'
import { counterReducer } from './counter_slice'

export default configureStore({
  reducer: {
    application: applicationReducer,
    counter: counterReducer,
  },
})