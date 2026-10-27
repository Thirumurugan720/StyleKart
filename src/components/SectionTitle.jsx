export default function SectionTitle({ eyebrow, title, subtitle, action }) {
  return <div className="section-title-row">
    <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
    {action}
  </div>;
}