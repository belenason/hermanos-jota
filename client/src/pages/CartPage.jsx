import { useCart } from "react-use-cart";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { crearPedido } from "../apiPedidos"; // ajustá el path si es necesario

const formatARS = (n) => `$ ${Number(n || 0).toLocaleString("es-AR")}`;

export default function CartPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function handleFinalizarCompra() {
    setErrorMsg("");
    setSuccessMsg("");

    if (!items.length) {
      setErrorMsg("Tu carrito está vacío.");
      return;
    }

    // Si no está autenticado, lo mandamos a login
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/carrito" } });
      return;
    }

    // Mapeamos los ítems del carrito al formato que espera el backend
    const payloadItems = items.map((it) => ({
      // react-use-cart usa `id` como identificador principal
      productoId: it.id || it._id,
      cantidad: it.quantity || 1,
    }));

    setCreating(true);
    try {
      // apiPedidos.crearPedido ya hace { items: payloadItems } y agrega el token
      await crearPedido(payloadItems);

      emptyCart();
      setSuccessMsg("¡Pedido creado con éxito! Podés verlo en Mis pedidos.");
      navigate("/mis-pedidos");
    } catch (error) {
      console.error("Error al crear pedido:", error);
      setErrorMsg(error.message || "No se pudo finalizar la compra.");
    } finally {
      setCreating(false);
    }
  }

  if (!items.length) {
    return (
      <section className="cart-page-empty">
        <div className="empty-state">
          <div className="empty-icon">
            <i className="bi bi-cart3"></i>
          </div>
          <h2 className="empty-title">Tu carrito está vacío</h2>
          <p className="empty-text">Descubre nuestros productos artesanales</p>
          <Link to="/productos" className="btn-cart-primary">
            Explorar catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <section className="cart-page-container">
        <div className="cart-header">
          <div className="cart-header-left">
            <h2 className="cart-page-title">Carrito de compras</h2>
            <span className="cart-items-count">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </span>
          </div>
        </div>

        <div className="cart-content-grid">
          <div className="cart-items-section">
            {items.map((it) => (
              <div key={it.id} className="cart-item-card">
                <Link to={`/productos/${it.id}`} className="cart-item-link">
                  <img
                    src={
                      (Array.isArray(it.imagenes) && it.imagenes[0]) ||
                      it.imagen ||
                      "/img/producto-ejemplo.png"
                    }
                    alt={it.nombre}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{it.nombre}</h3>
                    <p className="cart-item-price">{formatARS(it.price)}</p>
                  </div>
                </Link>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateItemQuantity(it.id, it.quantity - 1)
                      }
                      disabled={it.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-display">{it.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateItemQuantity(it.id, it.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() => removeItem(it.id)}
                    title="Eliminar producto"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Resumen</h3>

            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">{formatARS(cartTotal)}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Envío</span>
              <span className="summary-value-muted">A calcular</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span className="summary-label-total">Total</span>
              <span className="summary-value-total">
                {formatARS(cartTotal)}
              </span>
            </div>

            {errorMsg && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="alert alert-success mt-3" role="status">
                {successMsg}
              </div>
            )}

            <button
              type="button"
              className="btn-cart-checkout"
              onClick={handleFinalizarCompra}
              disabled={creating || !items.length}
            >
              {creating ? "Procesando..." : "Finalizar compra"}
            </button>

            <Link to="/productos" className="btn-cart-continue">
              Seguir comprando
            </Link>

            <button
              type="button"
              className="btn-cart-clear-summary"
              onClick={emptyCart}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
