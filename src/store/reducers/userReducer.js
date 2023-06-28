import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   user: null,
   isLoggedIn: false,
}

const userFromLocalStorage = localStorage.getItem('user')
const isLoggedInFromLocalStorage = localStorage.getItem('isLoggedIn') === 'true'

if (userFromLocalStorage && isLoggedInFromLocalStorage) {
   initialState.user = JSON.parse(userFromLocalStorage)
   initialState.isLoggedIn = true
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload
         state.isLoggedIn = true
         localStorage.setItem('user', JSON.stringify(action.payload))
         localStorage.setItem('isLoggedIn', 'true')
      },
      logoutUser: state => {
         state.user = null
         state.isLoggedIn = false
         localStorage.removeItem('user')
         localStorage.removeItem('isLoggedIn')
      },
   },
})

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
