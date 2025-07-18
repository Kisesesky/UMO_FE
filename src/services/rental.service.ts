// src/services/rental.service.ts
import api from '@/services/api';
import { Rental, RentUmbrellaRequest, ReturnUmbrellaRequest } from '../types/rental';

export const RentalService = {
  async getMyRentals(): Promise<Rental[]> {
    const response = await api.get<Rental[]>('/rentals');
    return response.data;
  },

  async getRentalById(id: number): Promise<Rental> {
    const response = await api.get<Rental>(`/rentals/${id}`);
    return response.data;
  },

  async rentUmbrella(data: RentUmbrellaRequest): Promise<Rental> {
    const response = await api.post<Rental>('/rentals/rent', data);
    return response.data;
  },

  async confirmRental(id: number): Promise<Rental> {
    const response = await api.post<Rental>(`/rentals/${id}/confirm`);
    return response.data;
  },

  async returnUmbrella(id: number, data: ReturnUmbrellaRequest): Promise<Rental> {
    const response = await api.put<Rental>(`/rentals/${id}/return`, data);
    return response.data;
  },

  async cancelRental(id: number): Promise<Rental> {
    const response = await api.put<Rental>(`/rentals/${id}/cancel`);
    return response.data;
  }
};