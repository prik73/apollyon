import { useState, useRef } from 'react';

function googleSearch(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export default function ProductLink({ name, children }) {
  const [coords, setCoords] = useState(null);
  const spanRef = useRef(null);
  const display = children || name;

  const show = () => {
    if (!spanRef.current) return;
    const r = spanRef.current.getBoundingClientRect();
    const tooltipW = 220;
    let left = r.left + r.width / 2 - tooltipW / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipW - 8));
    const above = r.top > 170;
    setCoords({
      left,
      anchorLeft: Math.min(Math.max(r.left + r.width / 2 - left, 16), tooltipW - 16),
      above,
      top: above ? r.top - 8 : r.bottom + 8,
    });
  };

  const hide = () => setCoords(null);

  const links = [
    { label: 'Buy', cls: 'plt-link-buy', url: googleSearch(`${name} buy`) },
    { label: 'Search product', cls: 'plt-link-info', url: googleSearch(`${name} specifications review`) },
    { label: 'Datasheet', cls: 'plt-link-sheet', url: googleSearch(`${name} datasheet PDF`) },
  ];

  return (
    <>
      <span ref={spanRef} className="product-link-name" onMouseEnter={show} onMouseLeave={hide}>
        {display}
      </span>

      {coords && (
        <div
          className="product-link-tooltip"
          style={{
            position: 'fixed',
            left: coords.left,
            width: 220,
            ...(coords.above
              ? { bottom: window.innerHeight - coords.top }
              : { top: coords.top }),
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {coords.above && <div className="plt-arrow plt-arrow-down" style={{ left: coords.anchorLeft }} />}
          <div className="plt-name">{name}</div>
          <div className="plt-links">
            {links.map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className={`plt-link ${l.cls}`}>
                {l.label}
              </a>
            ))}
          </div>
          {!coords.above && <div className="plt-arrow plt-arrow-up" style={{ left: coords.anchorLeft }} />}
        </div>
      )}
    </>
  );
}
