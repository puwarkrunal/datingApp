import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
  },
  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },
  },
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;
