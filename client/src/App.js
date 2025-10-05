import React, { useEffect, useState } from "react";
import { fetchProducts } from "./services/api.js";

function App() {
  const [view, setView] = useState("catalog");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Renderizado con React.createElement
  if (view === "catalog") {
    if (loading) return React.createElement("p", null, "Cargando...");
    if (error) return React.createElement("p", { style: { color: "red" } }, error);

    const listItems = products.map((p) =>
      React.createElement(
        "li",
        { key: p.id },
        React.createElement(
          "button",
          {
            onClick: () => {
              setSelected(p);
              setView("detail");
            },
          },
          `${p.title} — $${p.price}`
        )
      )
    );

    return React.createElement(
      "div",
      { style: { padding: 16 } },
      React.createElement("h1", null, "Hermanos Jota"),
      React.createElement("p", null, `Carrito: ${cart.length}`),
      React.createElement("ul", null, listItems)
    );
  }

  if (view === "detail" && selected) {
    return React.createElement(
      "div",
      { style: { padding: 16 } },
      React.createElement("h2", null, selected.title),
      React.createElement("p", null, selected.description),
      React.createElement(
        "button",
        {
          onClick: () => setCart((prev) => [...prev, selected]),
        },
        "Añadir al carrito"
      ),
      React.createElement(
        "button",
        {
          onClick: () => {
            setSelected(null);
            setView("catalog");
          },
        },
        "Volver"
      )
    );
  }

  return null;
}

export default App;
