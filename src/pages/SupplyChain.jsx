import { tiers, geoRisk, riskRegister, euVendors } from '../data/supplyChain.js';

const RISK_BADGE = {
  low: 'badge-green',
  medium: 'badge-yellow',
  high: 'badge-red',
};

const PROB_BADGE = {
  low: 'badge-green',
  medium: 'badge-yellow',
  high: 'badge-red',
};

const IMPACT_BADGE = {
  low: 'badge-blue',
  medium: 'badge-yellow',
  high: 'badge-red',
};

export default function SupplyChain() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Supply Chain Analysis</div>
        <div className="page-subtitle">
          Three-tier supply chain architecture, geographic concentration risk, risk register,
          and prioritised Western/European vendor list. {euVendors.length} EU/Western priority vendors identified.
        </div>
      </div>

      <div className="section">
        <div className="section-title">Three-Tier Supply Chain Architecture</div>
        <div className="tier-flow">
          {tiers.map((tier, i) => (
            <>
              <div
                key={tier.id}
                className="tier-box"
                style={{ background: tier.color, borderColor: tier.borderColor }}
              >
                <div className="tier-label" style={{ color: tier.borderColor }}>{tier.label}</div>
                <div className="tier-subtitle">{tier.subtitle}</div>
                {tier.vendors.map(v => (
                  <div key={v.name} className="tier-vendor">
                    <div className="tier-vendor-name">{v.country} {v.name}</div>
                    <div className="tier-vendor-detail">{v.component}</div>
                  </div>
                ))}
              </div>
              {i < tiers.length - 1 && (
                <div key={`arrow-${i}`} className="tier-arrow">→</div>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">Geographic Concentration Risk</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Region</th>
                <th>Components Sourced</th>
                <th>Risk Level</th>
                <th>Assessment</th>
              </tr>
            </thead>
            <tbody>
              {geoRisk.map(r => (
                <tr key={r.region}>
                  <td style={{ fontWeight: 700, whiteSpace: 'nowrap', fontSize: 14 }}>{r.region}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12.5 }}>{r.components}</td>
                  <td><span className={`badge ${RISK_BADGE[r.riskLevel]}`}>{r.riskLabel}</span></td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12.5 }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Risk Register</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Risk</th>
                <th>Probability</th>
                <th>Impact</th>
                <th>Mitigation Strategy</th>
              </tr>
            </thead>
            <tbody>
              {riskRegister.map(r => (
                <tr key={r.risk}>
                  <td style={{ fontWeight: 600, maxWidth: 220 }}>{r.risk}</td>
                  <td><span className={`badge ${PROB_BADGE[r.probLevel]}`}>{r.probability}</span></td>
                  <td><span className={`badge ${IMPACT_BADGE[r.impactLevel]}`}>{r.impact}</span></td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12.5 }}>{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Western / European Priority Vendor List</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.6 }}>
          These vendors are prioritised to maximise Western/European supply chain content.
          All are established industrial or semi-industrial suppliers with direct email contact.
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Vendor</th>
                <th>Country</th>
                <th>Component</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {euVendors.map(v => (
                <tr key={v.priority}>
                  <td><span className="priority-num">{v.priority}</span></td>
                  <td style={{ fontWeight: 700 }}>{v.name}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{v.country}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{v.component}</td>
                  <td style={{ color: 'var(--accent-mid)', fontSize: 12 }}>{v.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Strategic Recommendations</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Finding</th><th>Action</th></tr>
            </thead>
            <tbody>
              {[
                ['1', 'Chinese component dependency is 60–70% by unit count',
                  'Dual-qualify Blue Robotics T500 (USA) for thrusters and OpenIPC/WFB-NG (open source) as FPV fallback.'],
                ['2', 'DJI FPV is best-in-class but single-source with export risk',
                  'Qualify OpenIPC + WFB-NG now as zero-cost alternative. No schedule impact if done in parallel.'],
                ['3', 'RFD900x telemetry radio is single-source (RFDesign, Australia)',
                  'Contact Microhard Systems (Canada) for n920 evaluation unit. Same frequency band, drop-in replacement.'],
                ['4', 'European autonomy stack is fully available',
                  'Septentrio (Belgium), u-blox (Switzerland), Emlid (Poland), ArduSimple (Spain), Mauch (Germany), Victron (Netherlands), Teltonika (Lithuania) cover the full guidance + power + connectivity layer.'],
                ['5', 'Autopilot supply concentration (CubePilot HK)',
                  'Holybro Pixhawk 6X (China) runs identical ArduRover firmware. Pre-qualify as second-source before production ramp.'],
                ['6', 'Battery chemistry risk (LiPo transport restrictions)',
                  'Evaluate LiFePO4 cells for production units. Safer chemistry, fewer air-freight restrictions, longer cycle life.'],
              ].map(([n, finding, action]) => (
                <tr key={n}>
                  <td><span className="priority-num">{n}</span></td>
                  <td style={{ fontWeight: 600, maxWidth: 220 }}>{finding}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
