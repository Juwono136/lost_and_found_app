import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import tokenReducer from '../features/token/tokenSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    token: tokenReducer,
    user: userReducer,
  },
})
