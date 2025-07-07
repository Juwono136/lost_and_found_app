import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, thunkAPI) => {
    try {
      return await authService.signin({ email, password })
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, thunkAPI) => {
    try {
      return await authService.signup(userData)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // signIn
      .addCase(signIn.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      // signUp
      .addCase(signUp.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, state => {
        state.loading = false
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export default authSlice.reducer
