const API_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_API_URL || '');

export async function registrarUsuario(userData){
    const response = await fetch(`${API_URL}/api/usuarios/registro`, { // Apunta a tu endpoint de backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData), // formData contiene { username, email, password }
    });
 
    if (!response.ok) {
      // Manejar errores del servidor (ej: usuario ya existe)
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
}