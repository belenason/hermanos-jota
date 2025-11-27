// src/apiUsuarios.js
import { apiGet, apiPost, apiPut } from './utils/apiClient';

// Registro público
export async function registrarUsuario(userData) {
  return apiPost('/api/usuarios/registro', userData, {
    auth: false, // público
  });
}

// Login público
export async function loginUsuario(credentials) {
  return apiPost('/api/usuarios/login', credentials, {
    auth: false, // público
  });
}

// Perfil del usuario autenticado
export async function perfilUsuario() {
  return apiGet('/api/usuarios/perfil', {
    auth: true, // requiere token
  });
}

// src/apiUsuarios.js
export const updatePerfil = async (token, payload) => {
  const res = await fetch('/api/usuarios/perfil', {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    // Esto lanza un error y lo agarra tu catch en ModificarCuenta.jsx
    throw new Error(data.message || 'Error al actualizar perfil');
  }

  return data.user; // ahora devolvemos solo el usuario actualizado
};

/* ========== FUNCIONES ADMIN ========== */

// GET todos los usuarios (admin)
export async function getUsuarios() {
  return apiGet('/api/usuarios/usuarios', {
    auth: true,
  });
}

// Cambiar rol de un usuario (admin)
export async function cambiarRolUsuario(id, nuevoRol) {
  return apiPut(`/api/usuarios/usuarios/${id}`, { rol: nuevoRol }, {
    auth: true,
  });
}
