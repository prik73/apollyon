import { competitors, yourBuild } from '../data/competitors.js';
import ProductLink from '../components/ProductLink.jsx';

const TIER_STYLE = {
  prosumer: { cls: 'badge-blue', label: 'Prosumer' },
  research: { cls: 'badge-yellow', label: 'Research' },
  enterprise: { cls: 'badge-red', label: 'Enterprise' },
};

function BoolCell({ value }) {
  if (value === true) return <span style={{ color: 'var(--green)', fontWeight: 600 }}>✓ Yes</span>;
  if (value === false) return <span style={{ color: 'var(--text-muted)' }}>— No</span>;
  return <span style={{ color: 'var(--yellow)', fontSize: 12 }}>{value}</span>;
}

const SUMMARY_CARDS = [
  {
    tier: 'Direct Competitor', tierColor: '#2563eb',
    name: 'BlueBoat', mfr: 'Blue Robotics', price: '~$3,200',
    note: 'Closest match. Open-source ArduRover. No FPV or RF override stock.',
  },
  {
    tier: 'Research Tier', tierColor: '#ca8a04',
    name: 'Otter USV', mfr: 'Maritime Robotics (Norway)', price: '$30K–50K',
    note: 'Norwegian. ISO-certified. Used in Arctic survey operations.',
  },
  {
    tier: 'Research Tier', tierColor: '#ca8a04',
    name: 'Heron USV', mfr: 'Clearpath Robotics (Canada)', price: '$15K–25K',
    note: 'Canadian. ROS-native. Modular sensor payload architecture.',
  },
  {
    tier: 'Enterprise', tierColor: '#dc2626',
    name: 'C-Worker 4', mfr: 'L3Harris ASV (UK)', price: '$100K+',
    note: 'UK. Defense/commercial workhorse with modular mission payload bays.',
  },
  {
    tier: 'Enterprise', tierColor: '#dc2626',
    name: 'Inspector MK2', mfr: 'ECA Group (France)', price: '$150K+',
    note: 'French naval contractor. Mine countermeasure certified.',
  },
];

export default function Competitors() {
  const allRows = [yourBuild, ...competitors];

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Competitor Analysis</div>
        <div className="page-subtitle">
          {competitors.length + 1} platforms tracked across prosumer, research, and enterprise tiers.
          Your Build is highlighted in blue as the comparison baseline. Tier pricing spans $3,200 to $200,000+.
        </div>
      </div>

      <div className="section">
        <div className="section-title">Market Tier Overview</div>
        <div className="comp-tier-cards">
          {SUMMARY_CARDS.map(c => (
            <div key={c.name} className="comp-tier-card">
              <div className="ctc-tier" style={{ color: c.tierColor }}>{c.tier}</div>
              <div className="ctc-name">{c.name}</div>
              <div className="ctc-mfr">{c.mfr}</div>
              <div className="ctc-price">{c.price}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>{c.note}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
