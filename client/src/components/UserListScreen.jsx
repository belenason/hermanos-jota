// src/components/UserListScreen.jsx 
import React, { useEffect, useState, useContext } from 'react';
import { getUsuarios, cambiarRolUsuario } from '../apiUsuarios';
import { AuthContext } from '../auth/AuthContext';

const UserListScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Usuario actual desde el contexto de autenticación
  const { currentUser } = useContext(AuthContext);

  // Helper para saber si un usuario de la lista soy "yo"
  const esUsuarioActual = (usuario) => {
    if (!usuario || !currentUser) return false;

    const sameId =
      (currentUser.id && (usuario._id === currentUser.id || usuario.id === currentUser.id)) ||
      (currentUser._id && usuario._id && usuario._id === currentUser._id);

    const sameEmail =
      currentUser.email &&
      usuario.email &&
      usuario.email.toLowerCase() === currentUser.email.toLowerCase();

    const sameUsername =
      currentUser.username &&
      usuario.username &&
      usuario.username === currentUser.username;

    return !!(sameId || sameEmail || sameUsername);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const openModal = (usuario) => {
    // Nunca permitir abrir el modal para uno mismo
    if (esUsuarioActual(usuario)) {
      alert('No podés modificar tu propio rol de administrador.');
      return;
    }
    setSelectedUser(usuario);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const confirmToggleAdmin = async () => {
    if (!selectedUser) return;

    // Segunda protección por si selectedUser llega a ser el usuario actual
    if (esUsuarioActual(selectedUser)) {
      alert('No podés modificar tu propio rol de administrador.');
      closeModal();
      return;
    }

    const esAdminActualmente = selectedUser.roles?.includes('admin');
    const nuevoRol = esAdminActualmente ? 'cliente' : 'admin';

    try {
      const resp = await cambiarRolUsuario(selectedUser._id, nuevoRol);
      const rolesActualizados = resp.user?.roles || [nuevoRol];

      setUsuarios((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id ? { ...u, roles: rolesActualizados } : u
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.message || 'Error al actualizar el rol');
    }
  };

  if (loading) {
    return (
      <div className="user-list-state">
        <div className="loading-spinner"></div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-state error">
        <i className="bi bi-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2 className="user-list-title">Usuarios</h2>
        <span className="user-count">{usuarios.length} usuarios</span>
      </div>

      <div className="user-list-grid">
        {usuarios.map((user) => {
          const isAdmin = user.roles?.includes('admin');
          const isCurrentUser = esUsuarioActual(user);

          return (
            <div key={user._id} className="user-card">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>

              <div className="user-info">
                <div className="user-name-row">
                  <h3 className="user-name">{user.username}</h3>
                  {isCurrentUser && <span className="self-badge">Vos</span>}
                </div>
                <a href={`mailto:${user.email}`} className="user-email">
                  {user.email}
                </a>
                <span className={`user-role ${isAdmin ? 'admin' : 'client'}`}>
                  {isAdmin ? 'Administrador' : 'Cliente'}
                </span>
              </div>

              <div className="user-actions">
                {/* NO mostrar el botón si es el propio usuario */}
                {!isCurrentUser && (
                  <button
                    className={`role-toggle-btn ${isAdmin ? 'demote' : 'promote'}`}
                    onClick={() => openModal(user)}
                  >
                    <i
                      className={`bi ${
                        isAdmin ? 'bi-shield-slash' : 'bi-shield-check'
                      }`}
                    ></i>
                    <span>{isAdmin ? 'Quitar admin' : 'Hacer admin'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de confirmación */}
      {showModal && selectedUser && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <div className="modal-header">
              <i
                className={`bi ${
                  selectedUser.roles?.includes('admin')
                    ? 'bi-shield-slash'
                    : 'bi-shield-check'
                }`}
              ></i>
              <h3>Confirmar cambio de rol</h3>
            </div>

            <div className="modal-body">
              <p>
                ¿Estás seguro que querés cambiar el rol de{' '}
                <strong>{selectedUser.username}</strong> a{' '}
                <strong>
                  {selectedUser.roles?.includes('admin')
                    ? 'Cliente'
                    : 'Administrador'}
                </strong>
                ?
              </p>
              {selectedUser.roles?.includes('admin') && (
                <div className="modal-warning">
                  <i className="bi bi-exclamation-triangle"></i>
                  <span>Este usuario perderá los privilegios de administrador</span>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={closeModal}>
                Cancelar
              </button>
              <button
                className={`modal-btn confirm ${
                  selectedUser.roles?.includes('admin') ? 'demote' : 'promote'
                }`}
                onClick={confirmToggleAdmin}
              >
                {selectedUser.roles?.includes('admin')
                  ? 'Quitar admin'
                  : 'Hacer admin'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserListScreen;
