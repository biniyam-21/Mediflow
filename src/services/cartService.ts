export function getCartCount(): number {
  try {
    const raw = localStorage.getItem('mediflow_cart_count');
    return raw !== null ? parseInt(raw, 10) : 3;
  } catch {
    return 3;
  }
}

export function setCartCount(count: number): void {
  localStorage.setItem('mediflow_cart_count', count.toString());
}
