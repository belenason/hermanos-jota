import { useCart } from "react-use-cart";
import "../styles/micss.css"; // ← importa el CSS

const formatARS = (n) => `$ ${Number(n || 0).toLocaleString("es-AR")}`;

export default function Cart({ onBack }) {
  const { items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();

  if (!items.length) {
    return (
      <section className="container my-5 cart-page pt-5">
        <h2 className="cart-title">🛒 Carrito</h2>
        <p className="empty">Tu carrito está vacío.</p>
        <button className="btn-secondary-custom" onClick={onBack}>Volver al catálogo</button>
      </section>
    );
  }

  return (
    <section className="container my-5 cart-page">
      <div className="cart-header cart-header-responsive">
        <h2 className="cart-title">🛒 Carrito ({totalItems})</h2>
        <div className="actions">
          <button className="btn-brand-fem" onClick={onBack}>Seguir comprando</button>
          <button className="btn-outline-brand-fem" onClick={emptyCart}>Vaciar carrito</button>
        </div>
      </div>

      <div className="cart-list">
        {items.map((it) => (
          <div key={it.id} className="cart-item">
            <div className="item-left">
              <img
                src={it.imagen || it.imagenes?.[0] || "/img/producto-ejemplo.jpg"}
                alt={it.nombre}
                className="item-thumb"
              />
              <div className="item-meta">
                <div className="item-name">{it.nombre}</div>
                <div className="item-price">{formatARS(it.price)}</div>
              </div>
            </div>

            <div className="item-right">
              <div className="qty-group" role="group" aria-label="Cantidad">
                <button className="qty-btn" onClick={() => updateItemQuantity(it.id, it.quantity - 1)}>-</button>
                <input
                  className="qty-input"
                  type="number"
                  min={1}
                  max={99}
                  value={it.quantity}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(99, Number(e.target.value) || 1));
                    updateItemQuantity(it.id, v);
                  }}
                />
                <button className="qty-btn" onClick={() => updateItemQuantity(it.id, it.quantity + 1)}>+</button>
              </div>

              <button className="btn-danger-outline" onClick={() => removeItem(it.id)}>Quitar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="total-label">Total:</div>
        <div className="total-value">{formatARS(cartTotal)}</div>
        <button className="btn-secondary-custom">Finalizar compra</button>
      </div>
    </section>
  );
}