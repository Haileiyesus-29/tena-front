import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
   user: userReducer,
   // Add other reducers here
})

export default rootReducer
