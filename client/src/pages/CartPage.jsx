import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const formatARS = (n) => `$ ${Number(n || 0).toLocaleString("es-AR")}`;

export default function CartPage() {
  const { items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, []); 

  if (!items.length) {
    return (
      <section className="cart-page-empty">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2 className="empty-title">Tu carrito está vacío</h2>
          <p className="empty-text">Descubre nuestros productos artesanales</p>
          <Link to="/productos" className="btn-cart-primary">Explorar catálogo</Link>
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
            <span className="cart-items-count">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
          </div>
        </div>

        <div className="cart-content-grid">
          <div className="cart-items-section">
            {items.map((it) => (
              <div key={it.id} className="cart-item-card">
                <Link to={`/productos/${it.id}`} className="cart-item-link">
                  <img
                    src={it.imagen || it.imagenes?.[0] || "/img/producto-ejemplo.png"}
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
                      onClick={() => updateItemQuantity(it.id, it.quantity - 1)}
                      disabled={it.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-display">{it.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateItemQuantity(it.id, it.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button className="btn-remove" onClick={() => removeItem(it.id)} title="Eliminar producto">
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
              <span className="summary-value-total">{formatARS(cartTotal)}</span>
            </div>

            <Link to="/" className="btn-cart-checkout">
              Finalizar compra
            </Link>
            
            <Link to="/productos" className="btn-cart-continue">
              Seguir comprando
            </Link>

            <button className="btn-cart-clear-summary" onClick={emptyCart}>
              Vaciar carrito
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}