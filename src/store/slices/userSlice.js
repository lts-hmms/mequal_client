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
    addFav(state, action) {
      state.Favslist.push(action.payload);
    },
    deleteFav(state, action) {
      const updateFavs = state.Favslist.filter(
        (movie) => movie !== action.payload
      );
      state.Favslist = updateFavs;
    },
    // changePassword(state, action) {
    //     state.
    // },
    // changeEmail(state, action) {},
  },
});

export const { setUser, addFav, deleteFav } = userSlice.actions;
export const userReducer = userSlice.reducer;
