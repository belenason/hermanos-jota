import ProductCard from '../components/ProductCard';

export default function Catalog({ products, loading, error, onSelect, onRetry }) {
  if (loading) return <p className="text-center my-5">Cargando productos…</p>;
  if (error) return (
    <div className="alert alert-danger text-center">
      <p>{error}</p>
      <button className="btn btn-primary" onClick={onRetry}>Reintentar</button>
    </div>
  );
  if (!products.length) return <p className="text-center my-5">No hay productos.</p>;

  return (
    <section className="row g-4">
      {products.map(p => (
        <div className="col-sm-6 col-md-4 col-lg-3" key={p.id}>
          <ProductCard product={p} onClick={()=>onSelect(p)} />
        </div>
      ))}
    </section>
  );
}
