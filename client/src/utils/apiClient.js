// src/utils/apiClient.js
import { getAuthHeaders } from './authHelpers';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

export { API_URL };

// Helper genérico
async function apiRequest(path, {
  method = 'GET',
  body,
  auth = false,
  headers = {},
} = {}) {

  let finalHeaders = { ...headers };

  // Si hay body y no se especificó Content-Type, lo agregamos
  if (body && !finalHeaders['Content-Type']) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  // Si la ruta es protegida, inyectamos Authorization: Bearer <token>
  if (auth) {
    finalHeaders = getAuthHeaders(finalHeaders);
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch (e) {
    // Si no hay JSON, dejamos data como {}
  }

  if (!res.ok) {
    throw new Error(data.message || 'Error en la solicitud.');
  }

  return data;
}

// Helpers específicos
export function apiGet(path, options = {}) {
  return apiRequest(path, { method: 'GET', ...options });
}

export function apiPost(path, body, options = {}) {
  return apiRequest(path, { method: 'POST', body, ...options });
}

export function apiPut(path, body, options = {}) {
  return apiRequest(path, { method: 'PUT', body, ...options });
}

export function apiDelete(path, options = {}) {
  return apiRequest(path, { method: 'DELETE', ...options });
}
