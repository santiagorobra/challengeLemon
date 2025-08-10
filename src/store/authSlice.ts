import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GoogleCreds = {
  idToken?: string | null;
  accessToken?: string | null;
  serverAuthCode?: string | null;
};

type GoogleUser = {
  id: string | null;
  email: string | null;
  name?: string | null;
  photo?: string | null;
};

type AuthState = {
  user: GoogleUser | null;
  creds: GoogleCreds | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  creds: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: GoogleUser; creds?: GoogleCreds }>
    ) {
      state.user = action.payload.user;
      state.creds = action.payload.creds ?? null;
      state.isAuthenticated = !!action.payload.user.id;
    },
    clearCredentials(state) {
      state.user = null;
      state.creds = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
