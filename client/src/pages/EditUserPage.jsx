// src/pages/EditUserPage.jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { perfilUsuario, updatePerfil } from '../apiUsuarios';

export default function EditUserPage() { 
  const { isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Cargar perfil al montar
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const cargarPerfil = async () => {
      try {
        const data = await perfilUsuario();
        setFormData({ username: data.username, email: data.email });
      } catch (error) {
        setErrorMsg(error.message || 'No se pudo cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();


  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setPasswordError('');
    setSuccessMsg('');


    // Validación local de contraseña
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setPasswordError('Debes ingresar la contraseña actual para cambiarla.');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setPasswordError('La nueva contraseña y su confirmación no coinciden.');
        return;
      }
    }

    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      setLoading(true);

      const payload = {
        username: formData.username,
        email: formData.email
      };

      if (formData.newPassword && formData.confirmPassword && formData.currentPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.password = formData.newPassword; // <-- CAMBIO: usar "password" en lugar de "newPassword"
      }

      const updated = await updatePerfil(token, payload);

      setFormData({ username: updated.username, email: updated.email, currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccessMsg('Perfil actualizado correctamente');
    } catch (error) {
      // Diferencio error de contraseña de otros errores
      
      if (error.message && (error.message.includes('Contraseña') || error.message.includes('currentPassword'))) {
        setPasswordError(error.message);
        
      } else {
        setErrorMsg(error.message || 'Error al actualizar perfil');
      }
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }


  };

  return ( <div className="modificar-cuenta-layout"> <div className="modificar-cuenta-card"> <h1>Modificar Cuenta</h1>


      {loading && <p>Cargando datos...</p>}
      {!loading && errorMsg && <p className="error-msg">{errorMsg}</p>}
      {!loading && passwordError && <p className="error-msg">{passwordError}</p>}
      {!loading && successMsg && <p className="success-msg">{successMsg}</p>}

      {!loading && (
        <form onSubmit={handleSubmit} className="info-cards">
          <div className="data-card">
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="data-card">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campos de contraseña */}
          <div className="data-card">
            <label>Contraseña actual</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword || ''}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña actual"
            />
          </div>

          <div className="data-card">
            <label>Nueva contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword || ''}
              onChange={handleChange}
              placeholder="Nueva contraseña"
            />
          </div>

          <div className="data-card">
            <label>Confirmar nueva contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              placeholder="Confirma tu nueva contraseña"
            />
          </div>

          <button type="submit" className="btn-primary">
            Guardar cambios
          </button>
        </form>
      )}
    </div>
  </div>


  );
}
