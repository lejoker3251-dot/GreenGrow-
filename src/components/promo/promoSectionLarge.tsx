interface Props {
  title: string;
  full_description: string;
  pageHeaderBgImg: string;
  pageHeaderMinVh: string;
  pageHeaderRadius?: string;
}

export default function PromoSectionLarge({
  title,
  full_description,
  pageHeaderBgImg,
  pageHeaderMinVh,
  pageHeaderRadius = '24px',
}: Props) {
  const pageHeader = {
    backgroundImage: `linear-gradient(120deg, rgba(15, 47, 29, .88), rgba(31, 75, 45, .45)), url(${pageHeaderBgImg})`,
    minHeight: pageHeaderMinVh,
    borderRadius: pageHeaderRadius,
  } as const;

  return (
    <section className="gg-template-promo mb-5">
      <div className="gg-template-promo-inner" style={pageHeader}>
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9 col-xl-8">
              <span className="gg-template-kicker">GreenGrow Seeds · Vorschau</span>
              <h1 className="display-3 fw-semibold text-white mt-3 mb-4">{title}</h1>
              <p className="lead text-white mb-4">{full_description}</p>
              <a className="btn btn-light btn-lg rounded-pill px-4" href="/#sortiment">Saatgut entdecken ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
