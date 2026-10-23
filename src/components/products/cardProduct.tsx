import ProductBadge from './productBadge';

interface Props {
  thumb_src: string;
  thumb_alt: string;
  title: string;
  description?: string;
  price?: number;
  color?: string;
  colors?: string[];
  position?: string;
  category?: string;
}

export default function CardProduct({ thumb_src, thumb_alt, title, description, price, color, colors = [], position = 'start', category = 'Saatgut' }: Props) {
  return (
    <article className="card gg-template-product-card h-100">
      <a className="gg-template-product-image" href="/product/" aria-label={`${title} – Produktdetails (Vorschau)`}>
        <img src={thumb_src} alt={thumb_alt} loading="lazy" width="320" height="320" />
      </a>
      <div className={`card-body text-${position}`}>
        <span className="gg-template-product-category">{category}</span>
        {color && <p className="small text-muted mb-1">{color}</p>}
        <h2 className="h5 fw-semibold mt-2">{title}</h2>
        {description && <p className="text-secondary small">{description}</p>}
        {colors.length > 0 && <ProductBadge colors={colors} />}
        {typeof price === 'number' && price > 0 && <p className="fw-bold mt-3">{price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>}
        <a className="btn btn-outline-success rounded-pill mt-2" href="/product/">Details ansehen ↗</a>
      </div>
    </article>
  );
}
