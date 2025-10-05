import products from '../data/products.js';

export function getAllProducts(req, res, next) {
  try {
    res.json(products);
  } catch (err) { next(err); }
}

export function getProductById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const product = products.find(p => Number(p.id) === id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) { next(err); }
}
