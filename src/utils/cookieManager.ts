
interface TokenHeaders {
  // Original case headers
  'X-Access-Token'?: string;
  'X-Refresh-Token'?: string;
  'X-Access-Token-Max-Age'?: string;
  'X-Refresh-Token-Max-Age'?: string;
  'X-Access-Token-Secure'?: string;
  'X-Refresh-Token-Secure'?: string;
  'X-Access-Token-HttpOnly'?: string;
  'X-Refresh-Token-HttpOnly'?: string;
  'X-Access-Token-SameSite'?: string;
  'X-Refresh-Token-SameSite'?: string;
  'X-Access-Token-Expires'?: string;
  'X-Refresh-Token-Expires'?: string;
  // Lowercase headers (as received from API)
  'x-access-token'?: string;
  'x-refresh-token'?: string;
  'x-access-token-max-age'?: string;
  'x-refresh-token-max-age'?: string;
  'x-access-token-secure'?: string;
  'x-refresh-token-secure'?: string;
  'x-access-token-httponly'?: string;
  'x-refresh-token-httponly'?: string;
  'x-access-token-samesite'?: string;
  'x-refresh-token-samesite'?: string;
  'x-access-token-expires'?: string;
  'x-refresh-token-expires'?: string;
}

/**
 * Check if the app is running on iOS native platform

/**
 * Store tokens in localStorage (for iOS platform only)
 */
export const storeTokensFromBackend = async (headers): Promise<void> => {
  // Only proceed if running on iOS native platform
  if (!isIOSNative()) {
    return;
  }

  try {
    // Handle both uppercase and lowercase header keys
    const accessToken = (headers['X-Access-Token'] || headers['x-access-token']) as string;
    const refreshToken = (headers['X-Refresh-Token'] || headers['x-refresh-token']) as string;
    
    if (!accessToken || !refreshToken) {
      return;
    }

    // Calculate expiration dates - handle both cases
    const accessTokenExpires = (headers['X-Access-Token-Expires'] || headers['x-access-token-expires']) as string;
    const refreshTokenExpires = (headers['X-Refresh-Token-Expires'] || headers['x-refresh-token-expires']) as string;
    
    const accessExpires = accessTokenExpires ? new Date(parseInt(accessTokenExpires) * 1000).toISOString() : undefined;
    const refreshExpires = refreshTokenExpires ? new Date(parseInt(refreshTokenExpires) * 1000).toISOString() : undefined;

    // Store tokens in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // Store expiration times
    if (accessExpires) {
      localStorage.setItem('accessTokenExpires', accessExpires);
    }
    if (refreshExpires) {
      localStorage.setItem('refreshTokenExpires', refreshExpires);
    }


  } catch (error) {
    console.error('Error storing tokens in localStorage:', error);
  }
};

/**
 * Get access token from localStorage (iOS only)
 */
export const getAccessToken = (): string | null => {
  if (!isIOSNative()) {
    return null;
  }
  
  const token = localStorage.getItem('accessToken');
  const expires = localStorage.getItem('accessTokenExpires');
  
  // Check if token is expired
  if (token && expires) {
    const expirationDate = new Date(expires);
    if (new Date() > expirationDate) {

      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenExpires');
      return null;
    }
  }
  
  return token;
};

/**
 * Get refresh token from localStorage (iOS only)
 */
export const getRefreshToken = (): string | null => {
  if (!isIOSNative()) {
    return null;
  }
  
  const token = localStorage.getItem('refreshToken');
  const expires = localStorage.getItem('refreshTokenExpires');
  
  // Check if token is expired
  if (token && expires) {
    const expirationDate = new Date(expires);
    if (new Date() > expirationDate) {
      
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshTokenExpires');
      return null;
    }
  }
  
  return token;
};

/**
 * Clear all tokens from localStorage (useful for logout)
 */
export const clearAllTokens = (): void => {
  if (!isIOSNative()) {
    return;
  }

  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpires');
    localStorage.removeItem('refreshTokenExpires');
    // Set a flag to indicate logout happened (to prevent re-authentication with cached cookies)
    localStorage.setItem('ios_logged_out', 'true');
  } catch (error) {
    console.error(error);
  }
};

/**
 * Check if user logged out on iOS (to prevent re-authentication with cached cookies)
 */
export const isIOSLoggedOut = (): boolean => {
  if (!isIOSNative()) {
    return false;
  }
  return localStorage.getItem('ios_logged_out') === 'true';
};

/**
 * Clear the iOS logout flag (call this after successful login)
 */
export const clearIOSLogoutFlag = (): void => {
  if (!isIOSNative()) {
    return;
  }
  try {
    localStorage.removeItem('ios_logged_out');
  } catch (error) {
    console.error(error);
  }
};

/**
 * Check if tokens exist in localStorage (iOS only)
 */
export const hasValidTokens = (): boolean => {
  if (!isIOSNative()) {
    return false;
  }
  
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  return !!(accessToken && refreshToken);
};
