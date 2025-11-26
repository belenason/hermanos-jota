// src/Cart/CartProvider.js
import {
  useReducer,
  useEffect,
} from 'react';

import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast';

const initialState = {
  items: [], // { id, nombre, price, quantity, imagen, ... }
};

// Normaliza el producto que viene de la API
function normalizeProduct(p) {
  return {
    id: p._id || p.id,
    nombre: p.nombre,
    price: Number(p.precio ?? p.price ?? 0),
    imagen:
      Array.isArray(p.imagenes) && p.imagenes.length
        ? p.imagenes[0]
        : p.imagenUrl || p.imagen || '/img/producto-ejemplo.png',
    ...p,
  };
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT_FROM_STORAGE': {
      return { ...state, items: action.payload || [] };
    }

    case 'ADD_ITEM': {
      const incoming = action.payload; // { id, quantity, ... }
      const existing = state.items.find((i) => i.id === incoming.id);

      let newItems;
      if (existing) {
        newItems = state.items.map((item) =>
          item.id === incoming.id
            ? { ...item, quantity: item.quantity + incoming.quantity }
            : item
        );
      } else {
        newItems = [...state.items, incoming];
      }

      return { ...state, items: newItems };
    }

    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      const qty = Math.max(1, Number(quantity) || 1);

      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      );

      return { ...state, items: newItems };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'EMPTY_CART': {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cartItems');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'INIT_FROM_STORAGE', payload: parsed });
        }
      }
    } catch (err) {
      console.error('Error leyendo carrito del storage', err);
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    } catch (err) {
      console.error('Error guardando carrito en storage', err);
    }
  }, [state.items]);

  const totalItems = state.items.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  const cartTotal = state.items.reduce(
    (acc, item) => acc + (item.quantity || 0) * Number(item.price || 0),
    0
  );

  // API del contexto
  const addToCart = (product, qty = 1) => {
    const normalized = normalizeProduct(product);
    const quantity = Number(qty) || 1;

    dispatch({
      type: 'ADD_ITEM',
      payload: { ...normalized, quantity },
    });

    toast.success('Producto agregado al carrito.');
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast('Producto eliminado del carrito');
  };

  const emptyCart = () => {
    dispatch({ type: 'EMPTY_CART' });
    toast('Carrito vaciado');
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        cartTotal,
        addToCart,
        updateItemQuantity,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
