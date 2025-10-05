import ProductCard from '../components/ProductCard';
import React, { useState } from 'react';
 export default function Catalog({ products, loading, error, onSelect, onRetry }) {
 const [buscado, setQuery] = useState('');
const filteredProducts = products.filter(p => p.nombre.toLowerCase().includes(buscado));

 
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
      <section className="contact-hero">
        <div className="contact-container">
          <h2 className="hero-title">Nuestros Productos</h2>
          <p className="hero-subtitle">
            Descubrí nuestra selección de muebles, diseñados para transformar tu espacio.
          </p>
       <input
            type="text"
            className="form-control my-3"
            placeholder="Buscar producto..."
            value={buscado}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </section>

      {filteredProducts.length ? (
        filteredProducts.map(p => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} onClick={() => onSelect(p)} />
          </div>
        ))
      ) : (
        <p className="text-center my-5">No se encontraron productos.</p>
      )}
    </section>
 );
 }