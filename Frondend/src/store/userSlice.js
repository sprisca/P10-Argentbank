import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    firstName: '',
    lastName: '',
    userName: '', // ✅ ajouté
  },

  reducers: {
    // ✅ merge: met à jour uniquement les champs présents dans payload
    setUserProfile: (state, { payload }) => {
      if (payload.firstName !== undefined) state.firstName = payload.firstName;
      if (payload.lastName !== undefined) state.lastName = payload.lastName;
      if (payload.userName !== undefined) state.userName = payload.userName;
    },

    clearUserProfile: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;