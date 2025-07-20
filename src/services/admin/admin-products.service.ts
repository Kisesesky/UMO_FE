// src/services/admin/admin-products.service.ts
import api from '@/services/api';
import type { AdminProduct, CreateProductDto, UpdateProductDto } from '@/types/admin/admin-products';

export const AdminProductsService = {
  async getAll(): Promise<AdminProduct[]> {
    const { data } = await api.get('/products');
    return data;
  },
  async getById(id: number): Promise<AdminProduct> {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  async create(payload: CreateProductDto): Promise<AdminProduct> {
    const { data } = await api.post('/products', payload);
    return data;
  },
  async update(id: number, payload: UpdateProductDto): Promise<AdminProduct> {
    const { data } = await api.patch(`/products/${id}`, payload);
    return data;
  },
  async remove(id: number): Promise<AdminProduct> {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};
