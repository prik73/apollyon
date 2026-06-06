
const STATS = [
  { value: '47', label: 'Total Components Catalogued' },
  { value: '10', label: 'Subsystems Covered' },
  { value: '9', label: 'Competitors Tracked' },
  { value: '12', label: 'Western/EU Priority Vendors' },
];

const COMPONENT_LIST = [
  { subsystem: 'Hull', component: 'Custom GRP catamaran', detail: '2–4m LOA · hull not finalized, planning phase', country: 'Local fabrication' },
  { subsystem: 'Cruise Motors', component: 'Torqeedo Cruise 3.0 R ×2', detail: '3kW each · integrated motor controller', country: 'Germany' },
  { subsystem: 'Sprint Motor', component: 'Lehner 2280 (Series 22)', detail: 'Inrunner · marine sprint motor · awaiting winding recommendation', country: 'Germany' },
  { subsystem: 'Autopilot', component: 'CubePilot Cube Orange+', detail: 'ArduRover firmware', country: 'HK' },
  { subsystem: 'GNSS', component: 'Septentrio mosaic-go H', detail: 'Dual-antenna heading · IP67 · triple-band', country: 'Belgium' },
  { subsystem: 'Telemetry', component: 'Holybro P900 (Microhard)', detail: '900MHz · 60km range', country: 'Canada core' },
  { subsystem: 'RC Override', component: 'TBS Crossfire TX + Nano RX', detail: '900MHz · 100km+ · CRSF native in ArduPilot', country: 'Switzerland' },
  { subsystem: 'FPV Nav Camera', component: 'RunCam Night Eagle 3', detail: 'Sony IMX462 · 0.00001 lux · always-on forward-facing FPV', country: 'China' },
  { subsystem: 'PTZ / Zoom Camera', component: 'SIYI MK15 + ZT30 Gimbal', detail: '15km video link · 4K + thermal imaging + 30× optical zoom', country: 'China' },
  { subsystem: 'Video VTX', component: 'Walksnail Avatar HD Mini', detail: 'Digital · 1080p · ~20ms latency · 6–8km', country: 'China' },
  { subsystem: 'Battery', component: 'Tattu Plus 6S 22Ah LiPo', detail: '22.2V · 488Wh · high discharge · commercial pack', country: 'China' },
  { subsystem: 'BMS', component: 'REC 2Q 16S', detail: 'Cell-level monitoring', country: 'Slovenia' },
  { subsystem: 'Companion Computer', component: 'Raspberry Pi CM5', detail: '4GB RAM · 32GB eMMC · MAVProxy (software that connects autopilot to ground station laptop)', country: 'UK' },
  { subsystem: 'Payload Release', component: 'Volz DA-26-SUB Servo', detail: 'IP68 · 5Nm · 12–32V · RS-485 telemetry', country: 'Germany', crossed: true },
  { subsystem: 'Sensors', component: 'Blue Robotics Ping2 ×2', detail: 'Forward sonar (collision) + downward sonar (depth)', country: 'USA', underReview: 'Raymarine Quantum 2 radar — under review' },
];

function BoatDiagram() {
  const label = (x, y, text, sub, align = 'left') => (
    <g key={text}>
      <text x={x} y={y} textAnchor={align} fontSize="11" fontWeight="600" fill="#0f172a">{text}</text>
      {sub && <text x={x} y={y + 14} textAnchor={align} fontSize="10" fill="#64748b">{sub}</text>}
    </g>
  );

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 16px', marginBottom: 28 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 16, textAlign: 'center' }}>
        Top-Down View — Planing Catamaran USV
      </div>
      <svg viewBox="0 0 780 340" style={{ width: '100%', maxWidth: 780, display: 'block', margin: '0 auto' }}>

        {/* === PORT PONTOON === */}
        <path d="M160,60 Q200,45 440,50 Q520,52 560,70 Q540,120 520,130 Q480,135 440,132 Q200,128 160,120 Q140,105 160,60Z"
          fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
        {/* === STARBOARD PONTOON === */}
        <path d="M160,220 Q200,212 440,208 Q520,208 560,220 Q540,270 520,282 Q480,288 440,285 Q200,282 160,272 Q140,258 160,220Z"
          fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />

        {/* === CROSS DECK === */}
        <rect x="200" y="118" width="300" height="96" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

        {/* === ELECTRONICS BAY (sealed box) === */}
        <rect x="230" y="128" width="130" height="76" rx="5" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="295" y="163" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e3a8a">ELECTRONICS</text>
        <text x="295" y="176" textAnchor="middle" fontSize="10" fill="#1e3a8a">SEALED BAY</text>

        {/* === PAYLOAD BAY === */}
        <rect x="370" y="130" width="110" height="72" rx="5" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="425" y="163" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">PAYLOAD</text>
        <text x="425" y="176" textAnchor="middle" fontSize="10" fill="#92400e">15–20 kg</text>

        {/* === FPV CAMERA (front center) === */}
        <ellipse cx="162" cy="171" rx="14" ry="11" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="162" cy="171" rx="8" ry="7" fill="#1d4ed8" />
        <ellipse cx="162" cy="171" rx="3" ry="3" fill="#93c5fd" />

        {/* === GPS ANTENNA 1 === */}
        <circle cx="250" cy="88" r="9" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
        <text x="250" y="91" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">GPS</text>
        {/* === GPS ANTENNA 2 === */}
        <circle cx="250" cy="246" r="9" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
        <text x="250" y="249" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">GPS</text>

        {/* === TELEMETRY ANTENNA === */}
        <rect x="298" y="118" width="6" height="18" fill="#7c3aed" rx="1" />
        <circle cx="301" cy="113" r="6" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1" />
        <text x="301" y="116" textAnchor="middle" fontSize="7" fontWeight="700" fill="white">RF</text>

        {/* === LTE ANTENNA === */}
        <rect x="314" y="118" width="6" height="18" fill="#b45309" rx="1" />
        <circle cx="317" cy="113" r="6" fill="#b45309" stroke="#92400e" strokeWidth="1" />
        <text x="317" y="116" textAnchor="middle" fontSize="7" fontWeight="700" fill="white">4G</text>

        {/* === MOTOR PORT === */}
        <ellipse cx="535" cy="90" rx="18" ry="12" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="535" cy="90" rx="10" ry="7" fill="#334155" />
        <line x1="519" y1="84" x2="551" y2="96" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="519" y1="96" x2="551" y2="84" stroke="#94a3b8" strokeWidth="1.5" />

        {/* === MOTOR STARBOARD === */}
        <ellipse cx="535" cy="252" rx="18" ry="12" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="535" cy="252" rx="10" ry="7" fill="#334155" />
        <line x1="519" y1="246" x2="551" y2="258" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="519" y1="258" x2="551" y2="246" stroke="#94a3b8" strokeWidth="1.5" />

        {/* DIRECTION ARROW */}
        <path d="M100,171 L125,158 L120,171 L125,184 Z" fill="#94a3b8" />
        <text x="75" y="168" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">BOW</text>
        <text x="75" y="180" textAnchor="middle" fontSize="10" fill="#64748b">(FORE)</text>

        <text x="620" y="168" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">STERN</text>
        <text x="620" y="180" textAnchor="middle" fontSize="10" fill="#64748b">(AFT)</text>

        {/* === LABELS LEFT SIDE === */}
        {label(12, 74, 'FPV Camera', 'DJI O3 / RunCam', 'left')}
        {label(12, 104, 'GPS #1 (Port)', 'Emlid Reach M2', 'left')}
        {label(12, 258, 'GPS #2 (Stbd)', 'Emlid Reach M2', 'left')}
        {label(12, 288, 'Servo release', 'Savox SB-2273SG', 'left')}

        {/* line from FPV label to camera */}
        <line x1="110" y1="70" x2="150" y2="166" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="118" y1="100" x2="241" y2="91" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="118" y1="254" x2="241" y2="248" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="118" y1="284" x2="370" y2="202" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />

        {/* === LABELS RIGHT SIDE === */}
        {label(648, 74, 'Motor (Port)', 'T500 / Flipsky IP68', 'left')}
        {label(648, 104, 'ESC (Port)', 'SeaKing 130A', 'left')}
        {label(648, 248, 'Motor (Stbd)', 'T500 / Flipsky IP68', 'left')}
        {label(648, 278, 'ESC (Stbd)', 'SeaKing 130A', 'left')}

        <line x1="646" y1="70" x2="553" y2="88" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="646" y1="100" x2="553" y2="95" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="646" y1="244" x2="553" y2="252" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="646" y1="274" x2="553" y2="257" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />

        {/* === TOP LABELS === */}
        {label(298, 106, 'Telemetry', 'RFD900x', 'middle')}
        {label(317, 106, '', '', 'middle')}

        {/* SCALE BAR */}
        <line x1="200" y1="320" x2="480" y2="320" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="200" y1="314" x2="200" y2="326" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="480" y1="314" x2="480" y2="326" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="340" y="335" textAnchor="middle" fontSize="10" fill="#64748b">≈ 1.8 – 2.4 m LOA</text>

        {/* PORT / STARBOARD LABELS */}
        <text x="640" y="52" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">PORT</text>
        <text x="640" y="302" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="600">STARBOARD</text>

      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 16 }}>
        {[
          { color: '#cbd5e1', label: 'GRP Pontoon Hull' },
          { color: '#bfdbfe', border: '#3b82f6', label: 'Electronics Bay (sealed)' },
          { color: '#fde68a', border: '#d97706', label: 'Payload Bay (15–20kg)' },
          { color: '#16a34a', label: 'GPS / GNSS Antenna' },
          { color: '#7c3aed', label: 'RF Telemetry Antenna' },
          { color: '#b45309', label: 'LTE 4G Antenna' },
          { color: '#0f172a', label: 'Brushless Motor + Prop' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: l.color, border: l.border ? `1.5px solid ${l.border}` : '1px solid #94a3b8', flexShrink: 0 }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Apollyon Dynamics — USV Intelligence Report</div>
        <div className="page-subtitle">
          Comprehensive bill of materials, supply chain analysis, and competitor landscape
          for a high-performance long-range Autonomous Surface Vehicle with FPV and dual RF systems.
        </div>
      </div>


      <div className="section">
        <div className="section-title">Vehicle Layout — What the Boat Looks Like</div>
        <BoatDiagram />
      </div>

      <div className="section">
        <div className="section-title">Component Overview</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Subsystem</th>
                <th>Chosen Component</th>
                <th>Key Spec</th>
                <th>Origin</th>
              </tr>
            </thead>
            <tbody>
              {COMPONENT_LIST.map(r => (
                <tr key={r.subsystem} style={ r.crossed ? { opacity: 0.45 } : {} }>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap', textDecoration: r.crossed ? 'line-through' : 'none' }}>{r.subsystem}</td>
                  <td style={{ fontWeight: 500, color: 'var(--accent-mid)', textDecoration: r.crossed ? 'line-through' : 'none' }}>{r.component}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12.5, textDecoration: r.crossed ? 'line-through' : 'none' }}>
                    {r.detail}
                    {r.underReview && (
                      <span style={{ display: 'block', marginTop: 4, color: '#b45309', fontSize: 12, fontStyle: 'italic', border: '1px solid #fed7aa', borderRadius: 4, padding: '2px 6px', display: 'inline-block' }}>
                        ⚠ {r.underReview}
                      </span>
                    )}
                  </td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: 13, textDecoration: r.crossed ? 'line-through' : 'none' }}>{r.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
