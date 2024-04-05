import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  username: string;
  jwt: string;
};

type UserState = {
  user: User | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: (() => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    })(),
  } as UserState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
