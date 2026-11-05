type ShotProps = {
  label: string;
  title: string;
  note: string;
  alt: string;
  caption: string;
};

export function Shot({ label, title, note, alt, caption }: ShotProps) {
  return (
    <figure className="shot">
      <div className="shot-frame" role="img" aria-label={alt}>
        <span className="badge">{label}</span>
        <p className="shot-title">{title}</p>
        <p className="shot-note">{note}</p>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
