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
