// src/utils/authHelpers.js

export function getAuthToken() {
  const token = localStorage.getItem('authToken');
  if (token) return token;

  throw new Error('No estás autenticado. Iniciá sesión para continuar.');
}

export function getAuthHeaders(extra = {}) {
  const token = getAuthToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}
