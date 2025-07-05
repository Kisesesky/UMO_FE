// src/services/product.service.ts
import api from './api';
import { Product } from '../types/product';

export const ProductService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  async getProductsByType(type: string): Promise<Product[]> {
    const response = await api.get<Product[]>(`/products/type/${type}`);
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }
};