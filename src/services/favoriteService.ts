const FAVORITES_KEY = 'mediflow_favorite_meds';

export function getFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['med-004', 'med-008']; // pre-seed insulin & rabies vaccine
  } catch {
    return ['med-004', 'med-008'];
  }
}

export function isFavorite(medicineId: string): boolean {
  const favorites = getFavoriteIds();
  return favorites.includes(medicineId);
}

export function toggleFavorite(medicineId: string): boolean {
  const favorites = getFavoriteIds();
  let updated: string[];
  let nowFav = false;

  if (favorites.includes(medicineId)) {
    updated = favorites.filter((id) => id !== medicineId);
    nowFav = false;
  } else {
    updated = [...favorites, medicineId];
    nowFav = true;
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return nowFav;
}
