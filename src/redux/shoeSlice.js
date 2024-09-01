// shoesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getShoes } from "../api";
export const fetchShoes = createAsyncThunk("shoes/fetchShoes", async () => {
  const response = await getShoes();
  return response;
});

const shoesSlice = createSlice({
  name: "shoes",
  initialState: {
    list: [],
    currentIndex: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    nextShoe: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.list.length;
    },
    prevShoe: (state) => {
      state.currentIndex =
        (state.currentIndex === 0 ? state.list.length : state.currentIndex) - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShoes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchShoes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { nextShoe, prevShoe } = shoesSlice.actions;

export default shoesSlice.reducer;
