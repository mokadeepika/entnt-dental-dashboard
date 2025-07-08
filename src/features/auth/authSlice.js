import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadState, saveState, clearState } from "../../utils/local";

const USERS = JSON.parse(localStorage.getItem("users")) ?? [];

const initial = loadState("auth", { user: null, status: "idle", error: null });

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    await new Promise(r => setTimeout(r, 300));
    const u = USERS.find(x => x.email === email && x.password === password);
    return u || rejectWithValue("Invalid credentials");
  }
);

const slice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    logout(s) {
      s.user = null; s.status = "idle"; s.error = null;
      clearState("auth");
    }
  },
  extraReducers: b => {
    b.addCase(login.pending,   s => { s.status = "loading"; })
     .addCase(login.fulfilled, (s,a) => { s.status = "succeeded"; s.user = a.payload; saveState("auth", s); })
     .addCase(login.rejected,  (s,a) => { s.status = "failed"; s.error = a.payload; });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
