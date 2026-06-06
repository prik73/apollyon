const TABS = [
  { id: 'specsheet', label: 'Spec Sheet' },
  { id: 'overview', label: 'Old' },
];

export default function Navbar({ active, onTab }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">AD</div>
        <div>
          <div className="navbar-title">Apollyon Dynamics</div>
          <div className="navbar-subtitle">Autonomous USV Intelligence Platform</div>
        </div>
      </div>
      <div className="navbar-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-tab${active === t.id ? ' active' : ''}`}
            onClick={() => onTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
