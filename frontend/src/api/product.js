import axios from "axios";
import axiosClient from "./axiosClient";
import {apiURL} from "./apiURL";

// GET all product
export const getAllProducts = async (param) => {
  try {
    let query = `?page=${param.page}&limit=${param.limit}&search=${param.search}`
    const response = await axiosClient.get(apiURL.getAllProducts + query, {
      headers: {
        Authorization: '',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// CREATE product
export const createProduct = async (param) => {
  try {
    const response = await axiosClient.post(apiURL.createProduct, param, {
      headers: {
        Authorization: '',
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// DELETE product
export const deleteProduct = async (param) => {
  try {
    
    const response = await axiosClient.post(apiURL.deleteProduct, param, {
      headers: {
        Authorization: '',
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// UPDATE product
export const updateProduct = async (param) => {
  try {
    

    const response = await axiosClient.put(apiURL.updateProduct, param, {
      headers: {
        Authorization: '',
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
