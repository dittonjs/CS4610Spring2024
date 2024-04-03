import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment(state) {
      state.value ++;
    },
    decrement(state) {
      state.value --;
    },
    incrementByAmount(state, amount) {
      state.value += amount;
    },
    decrementByAmount(state, amount) {
      state.value -= amount;
    },
    reset(state) {
      state.value = 0;
    }
  }
})

export const counterReducer = counterSlice.reducer;
export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  reset
} = counterSlice.actions;

export const counter = (state) => state.counter.value;