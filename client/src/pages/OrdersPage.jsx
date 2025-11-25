// src/pages/OrdersPage.jsx
import OrderCard from '../components/OrderCard';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { getMisPedidos } from '../apiPedidos';

export default function OrdersPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const cargarPedidos = async () => {
      try {
        const data = await getMisPedidos(token);
        setPedidos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error cargando pedidos:', error);
        setErrorMsg(error.message || 'No se pudieron cargar tus pedidos.');
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, [isAuthenticated, navigate]);

  return (
    <>
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Mis pedidos</h2>
          <p className="hero-subtitle">
            Revisá el historial de compras que hiciste en Hermanos Jota.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          {loading && (
            <div className="loading-state mt-0">
              <div className="loading-spinner"></div>
              <p>Cargando pedidos...</p>
            </div>
          )}

          {!loading && errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          {!loading && !errorMsg && pedidos.length === 0 && (
            <div className="text-center py-5">
              <h5 className="mb-2">Todavía no hiciste ningún pedido</h5>
              <p className="text-muted mb-3">
                Cuando finalices una compra, vas a poder verla acá.
              </p>
              <button
                className="btn btn-secondary-custom"
                onClick={() => navigate('/productos')}
              >
                Ver productos
              </button>
            </div>
          )}

          {!loading && !errorMsg && pedidos.length > 0 && (
            <div className="row g-3">
              {pedidos.map((pedido) => (
                <div key={pedido._id} className="col-12 col-md-6 col-lg-4">
                  <OrderCard pedido={pedido} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
