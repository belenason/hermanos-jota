// src/apiUsuarios.js
const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

// Helper auth
function getAuthToken() {
  const userInfoRaw = localStorage.getItem('userInfo');
  if (userInfoRaw) {
    try {
      const parsed = JSON.parse(userInfoRaw);
      if (parsed.token) return parsed.token;
      if (parsed.user && parsed.user.token) return parsed.user.token;
    } catch (e) {
      console.warn('No se pudo parsear userInfo', e);
    }
  }
  const fallback = localStorage.getItem('authToken');
  if (fallback) return fallback;
  throw new Error('No estás autenticado. Iniciá sesión para continuar.');
}

function getAuthHeaders(extra = {}) {
  const token = getAuthToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

// Registro público
export async function registrarUsuario(userData) {
  const response = await fetch(`${API_URL}/api/usuarios/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al registrar usuario.');
  }

  return data;
}

// Login público
export async function loginUsuario(credentials) {
  const response = await fetch(`${API_URL}/api/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al iniciar sesión.');
  }

  return data;
}

// Perfil del usuario autenticado
export async function perfilUsuario() {
  const response = await fetch(`${API_URL}/api/usuarios/perfil`, {
    method: 'GET',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo obtener el perfil.');
  }

  return data;
}

/* ========== FUNCIONES ADMIN ========== */

// GET todos los usuarios (admin) -> GET /api/usuarios/usuarios
export async function getUsuarios() {
  const res = await fetch(`${API_URL}/api/usuarios/usuarios`, {
    method: 'GET',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error al cargar usuarios.');
  }
  return data;
}

// Cambiar rol de un usuario (admin) -> PUT /api/usuarios/usuarios/:id
export async function cambiarRolUsuario(id, nuevoRol) {
  const res = await fetch(`${API_URL}/api/usuarios/usuarios/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ rol: nuevoRol }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error al actualizar el rol.');
  }
  return data; // { message, user }
}
