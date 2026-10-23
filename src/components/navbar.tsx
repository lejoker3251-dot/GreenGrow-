const Navbar = () => (
  <nav className="navbar navbar-expand-lg gg-template-navbar shadow-sm sticky-top" aria-label="Hauptnavigation">
    <div className="container">
      <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/" aria-label="GreenGrow Seeds Startseite">
        <span className="gg-seed-mark" aria-hidden="true">✳</span><span>GreenGrow <small className="d-block gg-brand-caption">SEEDS</small></span>
      </a>
      <button className="navbar-toggler" type="button" aria-label="Menü öffnen" aria-expanded="false" data-gg-toggle>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse gg-template-nav-collapse" id="gg-template-nav">
        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
          <li className="nav-item"><a className="nav-link" href="/#sortiment">Saatgut-Sortiment</a></li>
          <li className="nav-item"><a className="nav-link" href="/#vorteile">Unsere Idee</a></li>
          <li className="nav-item"><a className="nav-link" href="/shopping-cart/">Merkliste</a></li>
          <li className="nav-item"><a className="nav-link" href="/">Zur Hauptseite ↗</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
