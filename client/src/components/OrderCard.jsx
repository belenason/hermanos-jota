export default function OrderCard({ pedido }) {
  const fecha = pedido.createdAt ? new Date(pedido.createdAt) : null;
  const total = pedido.total ?? 0;
  const items = pedido.items ?? [];

  return (
    <div className="order-card">
      {/* Header */}
      <div className="card-header">
        <span className="order-id">#{pedido._id?.slice(-6) || '—'}</span>
        {fecha && (
          <span className="order-date">
            {fecha.toLocaleDateString('es-AR', { 
              day: 'numeric', 
              month: 'short',
              year: '2-digit'
            })}
          </span>
        )}
      </div>

      {/* Lista de Productos */}
      <div className="card-body">
        {items.map((item, idx) => (
          <div key={idx} className="item-row">
            <span className="item-name">{item.nombre || 'Producto'}</span>
            <span className="item-quantity">x{item.cantidad || 1}</span>
          </div>
        ))}
      </div>

      {/* Footer / Total */}
      <div className="card-footer">
        <span className="total-amount">${total.toLocaleString('es-AR')}</span>
      </div>
    </div>
  );
}