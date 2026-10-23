export default function Footer() {
  return (
    <footer className="gg-template-footer mt-5 py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div><a className="gg-footer-brand" href="/">GreenGrow Seeds</a><p className="mb-0 mt-1">Saatgut-Ideen für Balkon, Beet und Garten.</p></div>
        <div className="small">Vorschau · Keine echten Bestellungen oder Zahlungen</div>
        <a className="small" href="https://github.com/creativetimofficial/astro-ecommerce" target="_blank" rel="noreferrer">Komponentenbasis: Creative Tim Astro Ecommerce ↗</a>
      </div>
    </footer>
  );
}
