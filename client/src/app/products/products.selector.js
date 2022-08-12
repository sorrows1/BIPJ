import { createSelector } from 'reselect';

const selectProductsReducer = (state) => state.product;

export const selectProducts = createSelector(
    [selectProductsReducer],
    (product) => product.productItems
)

export const selectProduct = createSelector(
  [selectProductsReducer],
  (product) => product.product
);