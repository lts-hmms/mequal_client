import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  Username: '',
  Password: '',
  Email: '',
  Birthday: '',
  Favslist: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
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
    changePassword(state, action) {
      return { ...state, ...action.payload };
    },
    changeEmail(state, action) {
      return { ...state, ...action.payload };
    },
    deleteUser() {
      return { ...initialState };
    },
  },
});

export const {
  setUser,
  addFav,
  deleteFav,
  changeEmail,
  changePassword,
  deleteUser,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
