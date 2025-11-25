// Custom Cart implementation replacing react-use-cart
import React, { createContext, useContext, useReducer, useEffect } from "react";

// --- initial state ---
const initialState = {
  items: [], // each item: { id, nombre, price, quantity, ... }
};

// --- reducer ---
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "UPDATE_QUANTITY": {
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: Math.max(1, action.payload.quantity) }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    }

    case "EMPTY_CART": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

// --- context ---
const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart-data"));
      return saved || initialState;
    } catch {
      return initialState;
    }
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart-data", JSON.stringify(state));
  }, [state]);

  // computed values
  const totalItems = state.items.reduce((a, b) => a + b.quantity, 0);
  const cartTotal = state.items.reduce((a, b) => a + b.price * b.quantity, 0);

  // API
  const addItem = (item, qty = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: qty } });

  const updateItemQuantity = (id, qty) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } });

  const removeItem = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const emptyCart = () => dispatch({ type: "EMPTY_CART" });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        cartTotal,
        addItem,
        updateItemQuantity,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
