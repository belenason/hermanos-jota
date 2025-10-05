export default function Navbar({ onNav, cartCount }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-light custom-navbar fixed-top">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link m-0 p-0" onClick={()=>onNav('home')}>
          <img src="/img/logo.svg" alt="Hermanos Jota" width="45" height="45" />
          <span className="ms-2 fs-4 color-principal-texto">Hermanos Jota</span>
        </button>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={()=>onNav('catalog')}>Catálogo</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={()=>onNav('contact')}>Contacto</button>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <i className="bi bi-cart3 fs-5"></i>
              <span className="badge rounded-pill elbadge">{cartCount}</span>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
