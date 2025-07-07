import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

// Thunk
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const profile = await userService.getCurrentUser()
      return profile
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.detail || err.message
      )
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile(state) {
      state.profile = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearProfile } = userSlice.actions
export default userSlice.reducer
