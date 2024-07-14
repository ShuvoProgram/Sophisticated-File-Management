// /redux/feature/user/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "@/lib/api";
import { authKey } from "@/constants/storageKey";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/lib/localStorage/localStorage";
import { IInitialState } from "@/types/common";

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const response = await getUserProfile();
  return response;
});

const initialState: IInitialState = {
  user: null,
  accessToken: getFromLocalStorage(authKey) as string,
  isLoading: true,
  error: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
      setToLocalStorage(authKey, action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = "";
      localStorage.removeItem(authKey);
    },
    setLoadingFalse: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.error = false;
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload?.data;
        state.isLoading = false;
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.error.message!;
        state.accessToken = "";
        localStorage.removeItem(authKey);
      });
  },
});

export const { setUser, setToken, logout, setLoadingFalse } = authSlice.actions;
export default authSlice.reducer;