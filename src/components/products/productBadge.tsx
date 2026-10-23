interface Props { colors: string[]; }
export default function ProductBadge({ colors }: Props) {
  return <div className="gg-product-swatches" aria-label="Farbvarianten">{colors.map((color) => <span key={color} className={`badge rounded-pill bg-${color}`}></span>)}</div>;
}
