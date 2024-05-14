import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  checkedCategory: [],
  searchProductList: [],
};

export const slice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        state.products = state.products.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        item.quantity--;
      }
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategory.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategory = state.checkedCategory.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategory.push(category);
      }
    },

    searchProductDataList: (state, action) => {
      state.searchProductList = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  toggleCategory,
  searchProductDataList,
} = slice.actions;
export default slice.reducer;
