import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:5000/api/v1'

export const getProductAll = createAsyncThunk(
  'product/getProductAll',
  async () => {
    try {
        const response = await axios.get(`${BASE_URL}/rewards`, {credentials: true});
        return response.data
    } catch (err) {
      return err;
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/rewards/${id}`, {credentials: true});
      return response.data;
    } catch (err) {
      return err;
    }
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (id, product) => {
    try{
      const response = await axios.patch(`${BASE_URL}/rewards/${id}`, product, {credentials: true})
      return response.data
    } catch(err) {
      return err
    }
  }
)

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    try {
      const response = await axios.post(`${BASE_URL}/rewards`, product,  {credentials: true});
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const removeProduct = createAsyncThunk(
  'product/removeProduct',
  async (productId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/rewards/${productId}`
      , {credentials: true});
      if (response.status !== 204) throw new Error('Failed to remove product');
      return productId;
    } catch (err) {
      return err;
    }
  }
);
