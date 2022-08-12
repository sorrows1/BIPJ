import { createSlice } from '@reduxjs/toolkit';

import { getProductAll, createProduct, removeProduct, getProduct, updateProduct } from './products.action';

const PRODUCTS_INITIAL_STATE = {
  productItems: [],
  product: {},
  status: 'idle',
  error: false,
};

const productsSlice = createSlice({
  name: 'product',
  initialState: PRODUCTS_INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getProductAll.fulfilled, (state, action) => {
        state.productItems = action.payload;
        state.status = 'idle';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = 'idle';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productItems.push(action.payload);
        state.status = 'idle';
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.productItems = state.productItems.filter(
          (product) => product.id !== action.payload
        );
        state.status = 'idle';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.productItems = state.productItems.map((prod) => {
          if (prod.id == action.payload.id) { return action.payload}
          return prod
        })
        state.status = 'idle';
      });
      
  },
});

export default productsSlice.reducer;