// src/hooks/useStations.ts
import { useState, useCallback } from 'react';
import { StationService } from '@/services/station.service';
import type { Station } from '@/types/rental';

export function useStations() {
  const [stations, setStations] = useState<Station[]>([]);

  const loadStations = useCallback(async () => {
    try {
      const data = await StationService.getAllStations();
      setStations(data);
    } catch (err) {
      console.error('Failed to load stations:', err);
    }
  }, []);

  return { stations, loadStations };
}
