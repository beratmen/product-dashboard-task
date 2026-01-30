const FAVORITES_KEY = 'product-dashboard-favorites';

export const getFavorites = (): number[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const saveFavorites = (ids: number[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const clearFavorites = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites from localStorage:', error);
  }
};
