import { Medicine } from '../types';
import { MOCK_MEDICINES } from '../data/mockMedicines';

let liveMedicines: Medicine[] = [...MOCK_MEDICINES];

export function getAllMedicines(): Medicine[] {
  return liveMedicines;
}

export function searchMedicines(query: string): Medicine[] {
  if (!query || query.trim() === '') {
    return liveMedicines;
  }
  const cleanQuery = query.toLowerCase().trim();
  return liveMedicines.filter(
    (med) =>
      med.Title.toLowerCase().includes(cleanQuery) ||
      med.City.toLowerCase().includes(cleanQuery) ||
      (med.PharmacyName && med.PharmacyName.toLowerCase().includes(cleanQuery)) ||
      (med.Description && med.Description.toLowerCase().includes(cleanQuery))
  );
}

export function getMedicineById(id: string): Medicine | undefined {
  if (!id) return liveMedicines[0];
  return liveMedicines.find((med) => med._id === id) || liveMedicines[0];
}

export function addMedicine(newMed: Omit<Medicine, '_id'>): Medicine {
  const created: Medicine = {
    ...newMed,
    _id: `med-${Date.now()}`,
    InStock: newMed.InStock ?? true,
    ImageUrl: newMed.ImageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60"
  };
  liveMedicines.unshift(created);
  return created;
}

export function deleteMedicine(id: string): Medicine[] {
  liveMedicines = liveMedicines.filter((med) => med._id !== id);
  return liveMedicines;
}
