import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  // u: {},
  // password: '',
  // email: '
  reducers: {
    setUser(state, action) {
      console.log('setUser reducer reached');
      const { ...stateUser } = action.payload;
      return stateUser;
    },
    // addFav(state, action) {},
    // deleteFav(state, action) {
    //     state.user.Favslist.push({})
    // }
    // changePassword(state, action) {
    //     state.
    // },
    // changeEmail(state, action) {},
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
