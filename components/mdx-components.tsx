export function Stats({ items }: { items: { n: string; l: string }[] }) {
  return (
    <div className="case__stats">
      {items.map((s) => (
        <div key={s.l}>
          <div className="n">{s.n}</div>
          <div className="l">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

export const mdxComponents = { Stats };
