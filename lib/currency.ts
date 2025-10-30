// Currency conversion utility
export const convertToJPY = async (usdPrice: number): Promise<string> => {
  try {
    // Using a free currency exchange API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const jpyRate = data.rates.JPY;
    const jpyPrice = usdPrice * jpyRate;
    
    // Format with Japanese Yen symbol and commas
    return `¥${Math.round(jpyPrice).toLocaleString('ja-JP')}`;
  } catch (error) {
    console.error('Currency conversion failed:', error);
    // Fallback to a fixed rate if API fails
    const fallbackRate = 150; // Approximate USD to JPY rate
    const jpyPrice = usdPrice * fallbackRate;
    return `¥${Math.round(jpyPrice).toLocaleString('ja-JP')}`;
  }
};

// For client-side usage with caching
let cachedRate: number | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const convertToJPYWithCache = async (usdPrice: number): Promise<string> => {
  const now = Date.now();
  
  // Use cached rate if available and not expired
  if (cachedRate !== null && (now - lastFetch) < CACHE_DURATION) {
    const jpyPrice = usdPrice * cachedRate;
    return `¥${Math.round(jpyPrice).toLocaleString('ja-JP')}`;
  }
  
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    cachedRate = data.rates.JPY;
    lastFetch = now;
    
    const jpyPrice = usdPrice * (cachedRate || 0);
    return `¥${Math.round(jpyPrice).toLocaleString('ja-JP')}`;
  } catch (error) {
    console.error('Currency conversion failed:', error);
    // Fallback to a fixed rate if API fails
    const fallbackRate = 150;
    cachedRate = fallbackRate;
    lastFetch = now;
    const jpyPrice = usdPrice * fallbackRate;
    return `¥${Math.round(jpyPrice).toLocaleString('ja-JP')}`;
  }
};
