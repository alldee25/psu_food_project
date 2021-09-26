import { createSelector } from "reselect";

export const getOrder = (state) = state.order;
export const getFilter = (state) = state.filter;

export const getAllOrder = () => 
  createSelector(
    OrderSelector,
    state => state.cart,
  );

export const getSomeOrder = (state, orderId) => 
  createSelector(
    OrderSelector,
    state => state.cart.filter(user => user.id === orderId)
  )